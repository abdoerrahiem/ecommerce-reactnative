const User = require('../../models/user')

const addUser = async (req, res) => {
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

  try {
    let user = await User.findOne({ email })

    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'User already exists.' })

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

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error, success: false })
  }
}

module.exports = addUser
