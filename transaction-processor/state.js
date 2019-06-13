const { _hash } = require('./lib')
const { XO_NAMESPACE } = require('./constants')

class SimpelStoreState {
  constructor(context) {
    this.context = context
    this.timeout = 500
    this.stateEntries = {}
  }

  setValue(value, devicePublicKey) {
    const address = makeAddress(devicePublicKey)
    let stateEntriesSend = {}
    stateEntriesSend[address] = Buffer.from(value)
    return this.context
      .setState(stateEntriesSend, this.timeout)
      .then(function(result) {
        console.log('Success', result)
      })
      .catch(function(error) {
        console.error('Error', error)
      })
  }
}

const makeAddress = x => XO_NAMESPACE + _hash(x)

module.exports = SimpelStoreState
