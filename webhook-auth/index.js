const express = require('express')
const app = express()
const requestClient = require('request')
const port = process.env.PORT || 6677

/* A simple sample
   Flow:
   1) Extracts token
   2) Fetches userInfo in a mock function
   3) Return hasura variables
*/
function fetchUserInfo(token, cb) {
  // This function takes a token and then makes an async
  // call to the session-cache or database to fetch
  // data that is needed for Hasura's access control rules
  cb()
}
app.get('/', (req, res) => {
  res.send('Webhooks are running')
})

app.get('/simple/webhook', (request, response) => {
  // Extract token from request
  var token = request.get('Authorization')

  // Fetch user_id that is associated with this token
  fetchUserInfo(token, result => {
    // Return appropriate response to Hasura
    var hasuraVariables = {
      'X-Hasura-Role': 'user', // result.role
      'X-Hasura-User-Id': '1' // result.user_id
    }
    response.json(hasuraVariables)
  })
})

// Firebase handler
const firebaseRouter = require('./firebaseHandler')
app.use('/firebase', firebaseRouter)

// listen for requests :)
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
})
