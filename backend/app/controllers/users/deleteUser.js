const User = require('../../models/user')

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndRemove(id)

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

    res.json({ success: true, message: 'User deleted successfully.' })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = deleteUser
