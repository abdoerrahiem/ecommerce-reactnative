const Order = require('../../models/order')
const OrderItem = require('../../models/order-item')

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
  } = req.body

  try {
    let orderItemIds = Promise.all(
      orderItems.map(async (item) => {
        const orderItem = await OrderItem.create({
          quantity: item.quantity,
          product: item.product,
        })

        return orderItem.id
      })
    )

    orderItemIds = await orderItemIds

    let totalPrices = await Promise.all(
      orderItemIds.map(async (item) => {
        const orderItem = await OrderItem.findById(item).populate(
          'product',
          'price'
        )

        const totalPrice = orderItem.product.price * orderItem.quantity

        return totalPrice
      })
    )

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

    const order = await Order.create({
      orderItems: orderItemIds,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user: req.user.id,
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ error, success: false })
  }
}

module.exports = addOrder
