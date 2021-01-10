const User = require('../../models/user')

const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id).select('-password')

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

    res.json(user)
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = getUser
