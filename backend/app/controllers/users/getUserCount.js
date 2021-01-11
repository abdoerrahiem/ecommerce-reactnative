const asyncHandler = require('express-async-handler')
const User = require('../../models/user')

const getUserCount = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments()

  res.json({ userCount })
})

module.exports = getUserCount
