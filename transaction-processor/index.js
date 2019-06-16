const { TransactionProcessor } = require('sawtooth-sdk/processor')

const SimpleStoreHandler = require('./handler')
const transactionProcessor = new TransactionProcessor(
  `tcp://${process.env.HOSTNAME}:4004`
)

transactionProcessor.addHandler(new SimpleStoreHandler())
transactionProcessor.start()

console.log(`Starting HexchainIoT Transaction Processor`)
console.log(
  `Connecting to Sawtooth validator at tcp://${process.env.HOSTNAME}:4004`
)
