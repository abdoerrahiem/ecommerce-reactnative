const asyncHandler = require('express-async-handler')
const User = require('../../models/user')

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')

  res.json(users)
})

module.exports = getUsers
