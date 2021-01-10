const Order = require('../../models/order')

const getOrder = async (req, res) => {
  const { id } = req.params

  try {
    const order = await Order.findById(id)
      .populate('user', 'name email username')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      })

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

module.exports = getOrder
