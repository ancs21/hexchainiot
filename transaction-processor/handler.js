const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const {
  InvalidTransaction,
  InternalError
} = require('sawtooth-sdk/processor/exceptions')
const SimpleStoreState = require('./state')
var { XO_FAMILY, XO_NAMESPACE } = require('./constants')
const cbor = require('cbor')

class SimpleStoreHandler extends TransactionHandler {
  constructor() {
    super(XO_FAMILY, ['1.1'], [XO_NAMESPACE])
  }

  apply(transactionProcessRequest, context) {
    let payload = cbor.decode(transactionProcessRequest.payload)
    let simpleStoreState = new SimpleStoreState(context)
    let header = transactionProcessRequest.header
    let devicePublicKey = header.signerPublicKey

    if (payload.action === 'set') {
      return simpleStoreState.setValue(payload.data, devicePublicKey)
    } else {
      throw new InvalidTransaction(`Action must be set not ${payload.action}`)
    }
  }
}

module.exports = SimpleStoreHandler
