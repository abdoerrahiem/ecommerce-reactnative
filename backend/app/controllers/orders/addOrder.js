const asyncHandler = require('express-async-handler')
const Order = require('../../models/order')
const OrderItem = require('../../models/order-item')

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
  } = req.body

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

  res
    .status(201)
    .json({ success: true, message: 'Order added successfully.', order })
})

module.exports = addOrder
