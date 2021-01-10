const Order = require('../../models/order')

const getOrderCount = async (req, res) => {
  const orderCount = await Order.countDocuments()

  res.json({ orderCount })
}

module.exports = getOrderCount
