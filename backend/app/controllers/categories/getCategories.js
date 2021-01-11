const asyncHandler = require('express-async-handler')
const Category = require('../../models/category')

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  res.json(categories)
})

module.exports = getCategories
