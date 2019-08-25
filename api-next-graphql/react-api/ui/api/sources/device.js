const { RESTDataSource } = require('apollo-datasource-rest')

class DeviceAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://35.240.145.241:8888`
  }

  async createKey() {
    return this.get('/device/create_key')
  }

  async getDeviceToken(deviceId) {
    return this.post('/device/token', { deviceId })
  }
}

module.exports = DeviceAPI
