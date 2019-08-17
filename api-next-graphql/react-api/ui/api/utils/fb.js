const admin = require('firebase-admin')

const serviceAccount = require('./key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hexchainiot.firebaseio.com'
})

module.exports = admin
