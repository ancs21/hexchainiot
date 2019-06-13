require('dotenv').config()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { HexchainIOTClient } = require('../client-processor')

exports.device_token = (req, res, next) => {
  const deviceId = req.body.deviceId
  if (!deviceId) {
    return res.status(401).json({
      error: 'No device in put'
    })
  }

  const isDeviceExists = fs.existsSync(
    `${process.cwd()}/store_key/${deviceId}.pub`
  )
  if (!isDeviceExists) {
    return res.status(401).json({
      message: 'Device is not exists'
    })
  }

  const token = jwt.sign(
    {
      deviceId: deviceId
    },
    process.env.JWT_SERECT
  )

  return res.status(200).json({
    message: 'Successful',
    token
  })
}

exports.send_data = async (req, res, next) => {
  const deviceId = req.device_data.deviceId
  const data = req.body.data

  const hexchain = new HexchainIOTClient(deviceId)
  const payload = {
    action: 'set',
    data: JSON.stringify({
      timestamp: +new Date(),
      temperature: data.temperature,
      humidity: data.humidity
    })
  }

  await hexchain.sendRequest(payload)

  return res.status(200).json({
    message: 'Successful',
    data
  })
}
