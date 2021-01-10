const router = require('express').Router()
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProducts,
  updateImages,
} = require('../controllers/products')
const { auth, admin, upload } = require('../../middlewares')

router.get('/featured/:count', getFeaturedProducts)
router.put('/images/:id', auth, admin, upload.array('images', 10), updateImages)
router.get('/count', getProductCount)
router
  .route('/')
  .get(getProducts)
  .post(auth, admin, upload.single('image'), addProduct)
router
  .route('/:id')
  .get(getProduct)
  .put(auth, admin, updateProduct)
  .delete(auth, admin, deleteProduct)

module.exports = router
