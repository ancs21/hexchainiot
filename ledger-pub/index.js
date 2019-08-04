require('dotenv').config()

const _ = require('lodash')
const { Stream } = require('sawtooth-sdk/messaging/stream')
const deepstream = require('deepstream.io-client-js')
const ds = deepstream(process.env.WS_SERVER, {
  silentDeprecation: true
})
ds.login(
  {
    username: 'spiderman',
    password: 'farfromhome'
  },
  function(success, data) {
    //success == true
    //data == { themeColor: 'pink' }
    console.log(success)
  }
)

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
const stream = new Stream(process.env.VALIDATOR_URL)

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
    const data = {
      block_num: parseInt(block.block_num),
      block_id: block.block_id,
      state_root_hash: block.state_root_hash,
      address: change.address,
      value: JSON.parse(Buffer.from(change.value).toString())
    }
    console.log(data)
    ds.event.emit(`data/${change.address}`, data)
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
        // subscriptions: [blockSub, deltaSub]
        subscriptions: [deltaSub]
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
