const router = require('express').Router()
const {
  getCategories,
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require('../controllers/categories')
const { auth, admin } = require('../../middlewares')

router.route('/').get(getCategories).post(auth, admin, addCategory)
router
  .route('/:id')
  .get(getCategory)
  .delete(auth, admin, deleteCategory)
  .put(auth, admin, updateCategory)

module.exports = router
