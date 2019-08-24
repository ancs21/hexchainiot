require('dotenv').config()
const { RESTDataSource } = require('apollo-datasource-rest')

class DeviceAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.HEXCHAIN_DEVICE_API
  }

  async createKey() {
    return this.get('/device/create_key')
  }

  async getDeviceToken(deviceId) {
    return this.post('/device/token', { deviceId })
  }
}

module.exports = DeviceAPI
