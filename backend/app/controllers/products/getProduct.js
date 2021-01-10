const Product = require('../../models/product')

const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id).populate('category')

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })

    res.json(product)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = getProduct
