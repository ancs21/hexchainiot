import React, { useState, useEffect } from 'react'
import deepstream from 'deepstream.io-client-js'
const ds = deepstream('ws://147.75.105.231:6020/deepstream', {
  silentDeprecation: true
})
ds.login()
export default () => {
  const [random, seRandom] = useState(null)
  useEffect(() => {
    return ds.event.subscribe('test-event-1', function(eventData) {
      seRandom(eventData.hello)
    })
  })
  return <h1>My random number: {random}</h1>
}
