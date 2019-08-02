const express = require('express')
const router = express.Router()

const DeviceController = require('../controllers/device')
const checkDevice = require('../middleware/checkDevice')

router.post('/token', DeviceController.device_token)
router.post('/send', [checkDevice], DeviceController.send_data)
router.post('/send_raw_data', DeviceController.send_raw_data)
router.get('/send_raw', DeviceController.send_raw)
router.get('/create_key', DeviceController.create_key)

module.exports = router
