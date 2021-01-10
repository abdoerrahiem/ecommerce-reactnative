const Category = require('../../models/category')

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, icon, color } = req.body

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, icon, color },
      { new: true }
    )

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

module.exports = updateCategory
