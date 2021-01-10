const Product = require('../../models/product')

const updateImages = async (req, res) => {
  const { id } = req.params
  let images = []

  try {
    const files = req.files
    if (files.length < 1)
      return res.status(400).json({
        success: false,
        message: 'Add at least one image.',
      })

    files.map((file) =>
      images.push(
        `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`
      )
    )

    const product = await Product.findByIdAndUpdate(
      id,
      {
        images,
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

module.exports = updateImages
