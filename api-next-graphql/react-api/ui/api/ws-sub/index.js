const WebSocket = require('ws')
const fetch = require('isomorphic-fetch')
const Redis = require('ioredis')

const redis = new Redis()

const ws = new WebSocket('ws://104.197.226.82:8008/subscriptions')

ws.on('open', () => {
  ws.send(
    JSON.stringify({
      action: 'subscribe',
      address_prefixes: ['fc3c28']
    })
  )
})

ws.on('message', async data => {
  const subData = JSON.parse(data)
  // console.log(subData)

  const blockInfo = await fetch(
    `http://104.197.226.82:8008/blocks/${subData.block_id}`
  )

  const dataRes = await blockInfo.json()
  const batches = dataRes.data.batches
  console.log(data)
  batches.map(async item => {
    const address = item.transactions[0].header.inputs[0]
    const trans_id = item.transactions[0].header_signature
    await redis
      .multi()
      .lrem(`devices:transactions_list:${address}`, 0, trans_id)
      .rpush(`devices:transactions_list:${address}`, trans_id)
      .exec()
  })
})
