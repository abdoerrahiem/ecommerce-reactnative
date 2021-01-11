const asyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { count } = req.params

  const products = await Product.find({ isFeatured: true })
    .populate('category')
    .limit(Number(count))

  res.json(products)
})

module.exports = getFeaturedProducts
