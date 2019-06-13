const express = require('express')
const router = express.Router()

const DeviceController = require('../controllers/device')
const checkDevice = require('../middleware/checkDevice')

router.post('/token', DeviceController.device_token)
router.post('/send', [checkDevice], DeviceController.send_data)

module.exports = router
