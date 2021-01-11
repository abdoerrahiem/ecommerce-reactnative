const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../../models/user')

const updateUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body

  let user = await User.findById(req.user.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  user.name = name
  user.email = email
  user.password = password
  user.phone = phone
  user.street = street
  user.apartment = apartment
  user.zip = zip
  user.city = city
  user.country = country

  user = await user.save()

  user = {
    name: user.name,
    email: user.email,
    username: user.username,
    token: user.generateToken(user.id),
  }

  res.json({ success: true, message: 'User updated successfully.', user })
})

module.exports = updateUser
