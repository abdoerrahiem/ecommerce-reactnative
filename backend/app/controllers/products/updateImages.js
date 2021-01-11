const asyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const updateImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  let images = []

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('Product not found.')
  }

  const files = req.files
  if (files.length < 1) {
    res.status(400)
    throw new Error('No images found.')
  }

  files.map((file) =>
    images.push(
      `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`
    )
  )

  const product = await Product.findByIdAndUpdate(id, { images }, { new: true })

  if (!product) {
    res.status(404)
    throw new Error('Product not found.')
  }

  res.json({ success: true, message: 'Images updated successfully', product })
})

module.exports = updateImages
