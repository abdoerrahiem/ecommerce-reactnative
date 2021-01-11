const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Category = require('../../models/category')

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, icon, color } = req.body

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Category not found.')
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { name, icon, color },
    { new: true }
  )

  if (!category) {
    res.status(404)
    throw new Error('Category not found.')
  }

  res.json({
    success: true,
    message: 'Category updated successfully.',
    category,
  })
})

module.exports = updateCategory
