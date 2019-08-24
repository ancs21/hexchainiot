import React, { useState, useEffect, useContext, createContext } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBtAOTryp1Fmv93HM1qR6j62UNkyfs7aqU',
  authDomain: 'hexchainiot.firebaseapp.com',
  databaseURL: 'https://hexchainiot.firebaseio.com',
  projectId: 'hexchainiot',
  storageBucket: '',
  messagingSenderId: '581192912622',
  appId: '1:581192912622:web:5708ef67b226104c'
}
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

export { firebase }

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
        localStorage.removeItem('token')
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setUser(user)
        const idToken = await firebase.auth().currentUser.getIdToken(true)
        localStorage.setItem('token', idToken)
        setLoading(false)
      } else {
        setUser(false)
        setLoading(false)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Return the user object and auth methods
  return {
    user,
    isLoading,
    signout
  }
}
