const admin = require('firebase-admin')

const serviceAccount = require('./hexchainiot-firebase-adminsdk-6t059-11e3dac237.json')

try {
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://hexchainiot.firebaseio.com'
    },
    'appppppppppppppppppppp'
  )
} catch (error) {
  console.log(error)
}

module.exports = admin
