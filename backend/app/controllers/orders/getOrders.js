const asyncHandler = require('express-async-handler')
const Order = require('../../models/order')

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email username')
    .sort({ createdAt: -1 })

  res.json(orders)
})

module.exports = getOrders
