const Product = require('../../models/product')

const getProducts = async (req, res) => {
  let filteredCategories = {}
  const { categories } = req.query

  if (categories) {
    filteredCategories = { category: categories.split(',') }
  }

  const products = await Product.find(filteredCategories).populate('category')

  res.json(products)
}

module.exports = getProducts
