const asyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const getProductCount = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments()

  res.json({ productCount })
})

module.exports = getProductCount
