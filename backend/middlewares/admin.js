const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Access denied, you are not an admin.')
  }
}

module.exports = admin
