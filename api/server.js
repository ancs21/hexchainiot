const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const port = process.env.PORT || 8888

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
