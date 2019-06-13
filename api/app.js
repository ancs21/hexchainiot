require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const deviceRoutes = require('./routers/device')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.get('/', (req, res) => {
  return res.status(200).send({
    hello: 'world'
  })
})

app.use('/device', deviceRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
