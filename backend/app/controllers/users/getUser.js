const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../../models/user')

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    res.status(404)
    throw new Error('User not found.')
  }

  const user = await User.findById(id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  res.json(user)
})

module.exports = getUser
