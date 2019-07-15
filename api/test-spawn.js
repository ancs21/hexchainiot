const { spawn } = require('child_process')
const data = '1234'
const sawtooth = spawn('', ['keygen', data])

sawtooth.stdout.on('data', data => {
  console.log(`stdout: ${data}`)
})

sawtooth.stderr.on('data', data => {
  console.log(`stderr: ${data}`)
})

sawtooth.on('close', code => {
  console.log(`child process exited with code ${code}`)
})
