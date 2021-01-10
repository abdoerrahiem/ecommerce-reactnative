const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const database = require('./config/db')
const {
  categoriesRoutes,
  ordersRoutes,
  productsRoutes,
  usersRoutes,
} = require('./app/routes')
const { errorHandler, notFoundRoute } = require('./middlewares')

require('dotenv').config()
database()

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)

app.use('/public', express.static(path.join(path.resolve(), '/public')))

app.use(notFoundRoute)
app.use(errorHandler)

app.listen(
  process.env.PORT,
  console.log(
    `Server running on port ${process.env.PORT} on ${process.env.NODE_ENV} mode.`
  )
)
