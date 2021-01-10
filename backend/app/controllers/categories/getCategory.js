const Category = require('../../models/category')

const getCategory = async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findById(id)

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Category not found.' })

    res.json(category)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Category not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = getCategory
