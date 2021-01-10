const Category = require('../../models/category')

const getCategories = async (req, res) => {
  const categories = await Category.find()

  res.json(categories)
}

module.exports = getCategories
