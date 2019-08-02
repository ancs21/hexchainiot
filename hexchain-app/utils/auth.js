import * as firebase from 'firebase/app'
require('firebase/auth')

const firebaseConfig = {
  apiKey: 'AIzaSyBtAOTryp1Fmv93HM1qR6j62UNkyfs7aqU',
  authDomain: 'hexchainiot.firebaseapp.com',
  databaseURL: 'https://hexchainiot.firebaseio.com',
  projectId: 'hexchainiot',
  storageBucket: '',
  messagingSenderId: '581192912622',
  appId: '1:581192912622:web:de3546afcc68240d'
}

export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app())
