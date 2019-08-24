const WebSocket = require('ws')

let ws = new WebSocket('ws://localhost:8008/subscriptions')

ws.on('open', function open() {
  ws.send(
    JSON.stringify({
      action: 'subscribe'
    })
  )
})

ws.on('message', function incoming(data) {
  console.log(data)
})
