const Product = require('../../models/product')

const getProductCount = async (req, res) => {
  const productCount = await Product.countDocuments()

  res.json({ productCount })
}

module.exports = getProductCount
