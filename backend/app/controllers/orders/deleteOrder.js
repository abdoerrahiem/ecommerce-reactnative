const Order = require('../../models/order')
const OrderItem = require('../../models/order-item')

const deleteOrder = async (req, res) => {
  const { id } = req.params

  try {
    const order = await Order.findById(id)

    order.orderItems.map(
      async (item) => await OrderItem.findByIdAndDelete(item)
    )

    await order.remove()

    res.json({ success: true, message: 'Order deleted successfully.' })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Order not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = deleteOrder
