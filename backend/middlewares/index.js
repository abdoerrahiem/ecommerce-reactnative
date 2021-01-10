const errorHandler = require('./errorHandler')
const notFoundRoute = require('./notFoundRoute')
const auth = require('./auth')
const admin = require('./admin')
const upload = require('./upload')

module.exports = {
  errorHandler,
  notFoundRoute,
  auth,
  admin,
  upload,
}
