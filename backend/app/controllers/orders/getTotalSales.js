const asyncHandler = require('express-async-handler')
const Order = require('../../models/order')

const getTotalSales = asyncHandler(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
  ])

  res.json({ totalSales: totalSales.pop().totalsales })
})

module.exports = getTotalSales
