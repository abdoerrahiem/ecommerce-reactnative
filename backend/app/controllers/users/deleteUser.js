const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../../models/user')

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('User not found.')
  }

  const user = await User.findByIdAndRemove(id)

  if (!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  res.json({ success: true, message: 'User deleted successfully.' })
})

module.exports = deleteUser
