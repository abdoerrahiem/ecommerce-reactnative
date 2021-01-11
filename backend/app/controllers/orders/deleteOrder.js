const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../models/order')
const OrderItem = require('../../models/order-item')

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Order not found.')
  }

  const order = await Order.findById(id)

  order.orderItems.map(async (item) => await OrderItem.findByIdAndDelete(item))

  await order.remove()

  res.json({ success: true, message: 'Order deleted successfully.' })
})

module.exports = deleteOrder
