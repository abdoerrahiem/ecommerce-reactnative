const asyncHandler = require('express-async-handler')
const Product = require('../../models/product')
const Category = require('../../models/category')

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    richDescription,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body

  const existedCategory = await Category.findById(category)
  if (!existedCategory) {
    res.status(400)
    throw new Error('Invalid category.')
  }

  const file = req.file
  if (!file) {
    res.status(400)
    throw new Error('Image not found.')
  }

  const image = `${req.protocol}://${req.get('host')}/public/uploads/${
    req.file.filename
  }`

  const product = await Product.create({
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  })

  res
    .status(201)
    .json({ success: true, message: 'Product added successfully.', product })
})

module.exports = addProduct
