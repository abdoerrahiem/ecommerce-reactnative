const Order = require('../../models/order')

const updateOrderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: 'Order not found.' })

    res.json(order)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Order not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = updateOrderStatus
