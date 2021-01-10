const Product = require('../../models/product')
const Category = require('../../models/category')

const addProduct = async (req, res) => {
  const {
    name,
    description,
    richDescription,
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

    const file = req.file
    if (!file)
      return res
        .status(400)
        .json({ success: false, message: 'No image available.' })

    const image = `${req.protocol}://${req.get('host')}/public/uploads/${
      req.file.filename
    }`

    const product = await Product.create({
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
    })

    res.status(201).json(product)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'Invalid category.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = addProduct
