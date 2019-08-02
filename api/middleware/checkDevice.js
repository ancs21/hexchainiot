require('dotenv').config()
const fs = require('fs')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SERECT)
    req.device_data = decoded

    if (decoded.deviceId(req.device_data.deviceId)) {
      next()
    } else {
      return res.status(401).json({
        message: 'Device is not exists'
      })
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Device auth failed'
    })
  }
}
