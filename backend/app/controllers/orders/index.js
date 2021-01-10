const getOrders = require('./getOrders')
const addOrder = require('./addOrder')
const getOrder = require('./getOrder')
const updateOrderStatus = require('./updateOrderStatus')
const deleteOrder = require('./deleteOrder')
const getTotalSales = require('./getTotalSales')
const getOrderCount = require('./getOrderCount')

module.exports = {
  getOrders,
  addOrder,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getOrderCount,
}
