const asyncHandler = require('express-async-handler')
const Category = require('../../models/category')

const addCategory = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body

  const existingCategory = await Category.findOne({
    name: name.toLowerCase(),
  })

  if (existingCategory) {
    res.status(400)
    throw new Error('Category already exists.')
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    icon,
    color,
  })

  res
    .status(201)
    .json({ success: true, message: 'Category added successfully.', category })
})

module.exports = addCategory
