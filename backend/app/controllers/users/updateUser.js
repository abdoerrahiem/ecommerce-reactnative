const User = require('../../models/user')

const updateUser = async (req, res) => {
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

  try {
    let user = await User.findById(req.user.id)

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

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

    res.json({
      name: user.name,
      email: user.email,
      username: user.username,
      token: user.generateToken(user.id),
    })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' })

    res.status(500).json({ error, success: false })
  }
}

module.exports = updateUser
