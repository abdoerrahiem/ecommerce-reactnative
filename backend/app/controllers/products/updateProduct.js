const Product = require('../../models/product')
const Category = require('../../models/category')

const updateProduct = async (req, res) => {
  const { id } = req.params
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body

  try {
    const existedCategory = await Category.findById(category)
    if (!existedCategory)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category.' })

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      },
      { new: true }
    )

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found.' })

    res.json(product)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Product/Category not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = updateProduct
