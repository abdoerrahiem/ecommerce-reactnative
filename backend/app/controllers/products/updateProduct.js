const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Product = require('../../models/product')
const Category = require('../../models/category')

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
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
  } = req.body

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Product not found.')
  }

  const existedCategory = await Category.findById(category)
  if (!existedCategory) {
    res.status(400)
    throw new Error('Invalid category.')
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  )

  if (!product) {
    res.status(404)
    throw new Error('Product not found.')
  }

  res.json({ success: true, message: 'Product updated successfully', product })
})

module.exports = updateProduct
