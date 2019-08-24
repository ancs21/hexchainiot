require('dotenv').config()
const { RESTDataSource } = require('apollo-datasource-rest')

class BlockchainAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.HEXCHAIN_REST_API
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
