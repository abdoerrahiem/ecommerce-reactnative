const asyncHandler = require('express-async-handler')
const User = require('../../models/user')

const addUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body

  let user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('User already exists.')
  }

  user = await User.create({
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  })

  res
    .status(201)
    .json({ success: true, message: 'User registered successfully.', user })
})

module.exports = addUser
