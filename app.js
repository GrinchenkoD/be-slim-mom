const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const authRoutes = require('./routes/api/auth.routes.js')
const productsRoutes = require('./routes/api/products.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
require('dotenv').config()
require('./config/passport')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
