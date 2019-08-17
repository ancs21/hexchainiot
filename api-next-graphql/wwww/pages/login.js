import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, firebase } from '../components/use-auth'

export default function Login() {
  const auth = useAuth()
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  return (
    <>
      {!auth.isLoading ? (
        auth.user ? (
          <h1>abc</h1>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )
      ) : (
        <p>Loading........</p>
      )}
    </>
  )
}
