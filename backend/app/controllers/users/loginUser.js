const User = require('../../models/user')

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        name: user.name,
        email: user.email,
        username: user.username,
        token: user.generateToken(user.id),
      })
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Email and password do not match.' })
    }
  } catch (error) {
    res.status(500).json({ error, success: false })
  }
}

module.exports = loginUser
