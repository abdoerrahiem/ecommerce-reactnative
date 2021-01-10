const Category = require('../../models/category')

const addCategory = async (req, res) => {
  const { name, icon, color } = req.body

  try {
    const existingCategory = await Category.findOne({
      name: name.toLowerCase(),
    })
    if (existingCategory)
      return res
        .status(400)
        .json({ success: false, message: 'Category already exists.' })

    const category = await Category.create({
      name: name.toLowerCase(),
      icon,
      color,
    })

    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ error, success: false })
  }
}

module.exports = addCategory
