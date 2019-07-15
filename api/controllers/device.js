require('dotenv').config()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const contentType = require('content-type')
const getRawBody = require('raw-body')
const queryString = require('query-string')

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
  console.log(data)

  const hexchain = new HexchainIOTClient(deviceId)
  const payload = {
    action: 'set',
    data: JSON.stringify({
      timestamp: +new Date(),
      ...data
    })
  }
  console.log(payload)

  await hexchain.sendRequest(payload)

  return res.status(200).json({
    message: 'Successful',
    data
  })
}

exports.send_raw_data = async (req, res, next) => {
  getRawBody(
    req,
    {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(req).parameters.charset
    },
    function(err, string) {
      if (err) return res.send(err)
      let req_json = queryString.parse(string.toString())
      console.log(req_json)
      try {
        const token = req_json.token
        const decoded = jwt.verify(token, process.env.JWT_SERECT)

        const isDeviceExists = fs.existsSync(
          `${process.cwd()}/store_key/${decoded.deviceId}.pub`
        )

        if (isDeviceExists) {
          delete req_json['token']
          const hexchain = new HexchainIOTClient(decoded.deviceId)
          const payload = {
            action: 'set',
            data: JSON.stringify({
              timestamp: +new Date(),
              ...req_json
            })
          }

          hexchain.sendRequest(payload)

          return res.status(200).json({
            message: 'Successful',
            ...req_json
          })
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
  )
}
