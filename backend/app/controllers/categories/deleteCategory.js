const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Category = require('../../models/category')

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Category not found.')
  }

  const category = await Category.findByIdAndRemove(id)

  if (!category) {
    res.status(404)
    throw new Error('Category not found.')
  }

  res.json({ success: true, message: 'Category deleted successfully.' })
})

module.exports = deleteCategory
