const User = require('../../models/user')

const getUsers = async (req, res) => {
  const users = await User.find().select('-password')

  if (!users) return res.status(500).json({ success: false })

  res.json(users)
}

module.exports = getUsers
