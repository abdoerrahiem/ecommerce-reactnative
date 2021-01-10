const Order = require('../../models/order')

const getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
    ])

    res.json({ totalSales: totalSales.pop().totalsales })
  } catch (error) {
    res.status(500).json({ error, success: false })
  }
}

module.exports = getTotalSales
