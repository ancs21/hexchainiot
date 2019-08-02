import React from 'react'
import { Spinner } from 'baseui/spinner'
import { Block } from 'baseui/block'

import Login from '../components/login'
import Devices from '../components/devices'

import { ContextOne } from '../store'
import firebase from '../utils/auth'

export default () => {
  const { state, dispatch } = React.useContext(ContextOne)
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken(true)
        localStorage.setItem(
          'auth',
          JSON.stringify({ status: 'in', user, token })
        )
        dispatch({ type: 'login', payload: { status: 'in', user, token } })
      } else {
        localStorage.setItem('auth', JSON.stringify({ status: 'out' }))
        dispatch({ type: 'login', payload: { status: 'out' } })
      }
    })
  }, [])
  // console.log(state)

  let content
  if (state.auth.status === 'loading') {
    content = (
      <Block
        marginTop="25%"
        width="100%"
        display="flex"
        alignSelf="center"
        justifyContent="center"
      >
        <Spinner />
      </Block>
    )
  } else {
    content = (
      <>
        <div>{state.auth.status === 'in' ? <Devices /> : <Login />}</div>
      </>
    )
  }
  return <Block>{content}</Block>
}
