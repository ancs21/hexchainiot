require('dotenv').config()

const _ = require('lodash')
const axios = require('axios')
const { Stream } = require('sawtooth-sdk/messaging/stream')

const {
  Message,
  EventList,
  EventSubscription,
  EventFilter,
  StateChangeList,
  ClientEventsSubscribeRequest,
  ClientEventsSubscribeResponse
} = require('sawtooth-sdk/protobuf')

const PREFIX = process.env.PREFIX
const NULL_BLOCK_ID = '0000000000000000'
const VALIDATOR_URL = process.env.VALIDATOR_URL
const stream = new Stream(VALIDATOR_URL)

// Parse Block Commit Event
const getBlock = events => {
  const block = _.chain(events)
    .find(e => e.eventType === 'sawtooth/block-commit')
    .get('attributes')
    .map(a => [a.key, a.value])
    .fromPairs()
    .value()
  return block
}

// Parse State Delta Event
const getChanges = events => {
  const event = events.find(e => {
    return e.eventType === 'sawtooth/state-delta'
  })

  if (!event) return []

  const changeList = StateChangeList.decode(event.data)
  return changeList.stateChanges.filter(change => {
    return change.address.slice(0, 6) === PREFIX
  })
}

// Handle event message received by stream
const handleEvent = msg => {
  if (msg.messageType === Message.MessageType.CLIENT_EVENTS) {
    const events = EventList.decode(msg.content).events
    deltasHandle(getBlock(events), getChanges(events))
  } else {
    console.warn('Received message of unknown type:', msg.messageType)
  }
}

const deltasHandle = (block, changes) => {
  _.partition(changes, change => {
    axios
      .post(
        process.env.GRAPHQL_URL,
        {
          query: `
            mutation insertBlock(
              $address: String
              $block_id: String
              $block_num: Int
              $state_root_hash: String
              $value: jsonb
            ) {
              insert_blocks(
                objects: {
                  block_num: $block_num
                  block_id: $block_id
                  address: $address
                  value: $value
                  state_root_hash: $state_root_hash
                }
              ) {
                returning {
                  block_num
                }
              }
            }
          `,
          variables: {
            block_num: parseInt(block.block_num),
            block_id: block.block_id,
            state_root_hash: block.state_root_hash,
            address: change.address,
            value: JSON.parse(Buffer.from(change.value).toString())
          }
        },
        {
          headers: {
            'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
          }
        }
      )
      .then(res => console.log(res.data.block_num))
      .catch(err => console.log(err.message))
  })
}

// Send delta event subscription request to validator
const subscribe = () => {
  const blockSub = EventSubscription.create({
    eventType: 'sawtooth/block-commit'
  })
  const deltaSub = EventSubscription.create({
    eventType: 'sawtooth/state-delta',
    filters: [
      EventFilter.create({
        key: 'address',
        matchString: `^${PREFIX}.*`,
        filterType: EventFilter.FilterType.REGEX_ANY
      })
    ]
  })

  return stream
    .send(
      Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST,
      ClientEventsSubscribeRequest.encode({
        lastKnownBlockIds: [NULL_BLOCK_ID],
        subscriptions: [blockSub, deltaSub]
      }).finish()
    )
    .then(response => ClientEventsSubscribeResponse.decode(response))
    .then(decoded => {
      const status = _.findKey(
        ClientEventsSubscribeResponse.Status,
        val => val === decoded.status
      )
      if (status !== 'OK') {
        throw new Error(`Validator responded with status "${status}"`)
      }
    })
}

// Start stream and send delta event subscription request
const start = () => {
  return new Promise(resolve => {
    stream.connect(() => {
      stream.onReceive(handleEvent)
      subscribe().then(resolve)
    })
  })
}

start()
