const jwt = require('jsonwebtoken')
const User = require('../app/models/user')

const auth = async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id)

      next()
    } catch (error) {
      res.status(401).json({ success: false, message: 'Token is not valid.' })
    }
  } else {
    res.status(401).json({ success: false, message: 'Access denied.' })
  }
}

module.exports = auth
