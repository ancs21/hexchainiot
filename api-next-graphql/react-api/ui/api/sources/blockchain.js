const { RESTDataSource } = require('apollo-datasource-rest')

class BlockchainAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://35.240.145.241:8008'
  }

  async getStateByAddress(address) {
    return this.get(`/state?address=${address}`)
  }

  async getBlockInfoById(blockId) {
    return this.get(`/block/${blockId}`)
  }

  async getDataFromReceipts(list_transactions) {
    return this.post(`/receipts`, list_transactions)
  }
}

module.exports = BlockchainAPI
