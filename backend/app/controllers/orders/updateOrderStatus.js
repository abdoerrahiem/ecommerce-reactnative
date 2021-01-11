const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../models/order')

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Order not found.')
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

  if (!order) {
    res.status(404)
    throw new Error('Order not found.')
  }

  res.json(order)
})

module.exports = updateOrderStatus
