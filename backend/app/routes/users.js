const router = require('express').Router()
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  getUserCount,
  loginUser,
  updateUser,
} = require('../controllers/users')
const { auth, admin } = require('../../middlewares')

router.route('/login').post(loginUser)
router.route('/count').get(getUserCount)
router.route('/').post(addUser).get(getUsers).put(auth, updateUser)
router.route('/:id').get(getUser).delete(auth, admin, deleteUser)

module.exports = router
