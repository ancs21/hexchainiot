import React from 'react'

import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
import { Input } from 'baseui/input'
import { Label2, Paragraph2 } from 'baseui/typography'

import firebase from '../utils/auth'

import { ContextOne } from '../store'

export default () => {
  const { state, dispatch } = React.useContext(ContextOne)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = (email, password) => async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(state)

  return (
    <Block>
      <Modal
        isOpen={true}
        overrides={{
          Dialog: {
            style: {
              borderTop: '3px solid #ffc107'
            }
          },
          Close: {
            style: {
              display: 'none'
            }
          }
        }}
      >
        <Label2
          margin="32px 16px"
          overrides={{
            Block: { style: { textAlign: 'center', fontSize: '24px' } }
          }}
        >
          Sign in
        </Label2>
        <ModalBody>
          <Paragraph2 marginBottom="8px">Email *</Paragraph2>
          <Input
            type="email"
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
            value={email}
          />
          <Block as="br" />
          <Paragraph2 marginBottom="8px">Password *</Paragraph2>
          <Input
            type="password"
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
            value={password}
          />
          <Block as="br" />
          <Button
            disabled={email !== '' && password !== '' ? false : true}
            onClick={login(email, password)}
            type="submit"
            overrides={{
              BaseButton: {
                style: {
                  display: 'flex',
                  width: '100%'
                }
              }
            }}
          >
            Login
          </Button>
        </ModalBody>
      </Modal>
    </Block>
  )
}
