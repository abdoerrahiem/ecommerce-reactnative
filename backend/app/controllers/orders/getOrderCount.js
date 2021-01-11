const asyncHandler = require('express-async-handler')
const Order = require('../../models/order')

const getOrderCount = asyncHandler(async (req, res) => {
  const orderCount = await Order.countDocuments()

  res.json({ orderCount })
})

module.exports = getOrderCount
