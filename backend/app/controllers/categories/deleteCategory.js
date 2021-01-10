// const mongoose = require('mongoose')
const Category = require('../../models/category')

const deleteCategory = async (req, res) => {
  const { id } = req.params

  // another way to check id
  // if(!mongoose.isValidObjectId(id)) return res.status(400).json({ success: false, message: 'Category not found'})

  try {
    const category = await Category.findByIdAndRemove(id)

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Category not found.' })

    res.json({ success: true, message: 'Category deleted successfully.' })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Category not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = deleteCategory
