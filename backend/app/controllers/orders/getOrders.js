const Order = require('../../models/order')

const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email username')
    .sort({ createdAt: -1 })

  if (!orders) return res.status(500).json({ success: false })

  res.json(orders)
}

module.exports = getOrders
