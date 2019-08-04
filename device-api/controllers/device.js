require('dotenv').config()

const jwt = require('jsonwebtoken')
const contentType = require('content-type')
const getRawBody = require('raw-body')
const queryString = require('query-string')
const url = require('url')
const uuid = require('uuid')

const { HexchainIOTClient } = require('../client-processor')
const { execShell, isDeviceExists } = require('../utils')

exports.create_key = async (_, res) => {
  try {
    // generate unique id
    const deviceId = uuid()

    // create private and public key secure
    await execShell(`sawtooth keygen ${deviceId}`)

    // get address of devive on blockchain
    const hexchain = new HexchainIOTClient(deviceId)
    // return deviceId
    res.json({
      message: 'Successful',
      deviceId,
      address_blockchain: hexchain.address
    })
  } catch (error) {
    res.status(401).json({ error })
  }
}

exports.device_token = (req, res) => {
  const deviceId = req.body.deviceId
  if (!deviceId) {
    return res.status(401).json({
      error: 'No device in put'
    })
  }

  if (!isDeviceExists(deviceId)) {
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

exports.send_data = async (req, res) => {
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

        if (isDeviceExists(decoded.deviceId)) {
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

exports.send_raw = async (req, res) => {
  let url_parts = url.parse(req.url, true)
  let req_json = url_parts.query

  console.log(req_json)
  try {
    const token = req_json.token
    const decoded = jwt.verify(token, process.env.JWT_SERECT)

    if (isDeviceExists(decoded.deviceId)) {
      delete req_json['token']
      const hexchain = new HexchainIOTClient(decoded.deviceId)
      const payload = {
        action: 'set',
        data: JSON.stringify({
          timestamp: new Date().toISOString(),
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
