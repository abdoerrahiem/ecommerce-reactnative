const User = require('../../models/user')

const getUserCount = async (req, res) => {
  const userCount = await User.countDocuments()

  res.json({ userCount })
}

module.exports = getUserCount
