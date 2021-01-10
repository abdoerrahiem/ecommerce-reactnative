const router = require('express').Router()
const {
  getOrders,
  addOrder,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getOrderCount,
} = require('../controllers/orders')
const { auth, admin } = require('../../middlewares')

router.route('/totalsales').get(getTotalSales)
router.route('/count').get(getOrderCount)
router.route('/').get(getOrders).post(auth, addOrder)
router
  .route('/:id')
  .get(getOrder)
  .put(auth, admin, updateOrderStatus)
  .delete(auth, admin, deleteOrder)

module.exports = router
