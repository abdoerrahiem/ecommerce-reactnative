const Product = require('../../models/product')

const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndRemove(id)

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })

    res.json({ success: true, message: 'Product deleted successfully.' })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = deleteProduct
