const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Order = require('../../models/order')

const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Order not found.')
  }

  const order = await Order.findById(id)
    .populate('user', 'name email username')
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: 'category' },
    })

  if (!order) {
    res.status(404)
    throw new Error('Order not found.')
  }

  res.json(order)
})

module.exports = getOrder
