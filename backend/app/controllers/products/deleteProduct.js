const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Product = require('../../models/product')

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Product not found.')
  }

  const product = await Product.findByIdAndRemove(id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found.')
  }

  res.json({ success: true, message: 'Product deleted successfully.' })
})

module.exports = deleteProduct
