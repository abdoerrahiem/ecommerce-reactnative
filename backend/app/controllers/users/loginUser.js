const asyncHandler = require('express-async-handler')
const User = require('../../models/user')

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      email: user.email,
      username: user.username,
      token: user.generateToken(user.id),
    })
  } else {
    res.status(401)
    throw new Error('Email and password do not match.')
  }
})

module.exports = loginUser
