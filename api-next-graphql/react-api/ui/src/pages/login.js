import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, firebase } from '../components/use-auth'
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
export default function Login() {
  const auth = useAuth()
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
        signInMethod: 'password'
      }
    ],
    // callbacks: {
    //   signInSuccessWithAuthResult: () => false
    // }
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        // Handle signed in user.
        user.getIdToken().then(function(idToken) {
          // Session login endpoint is queried and the session cookie is set.
          // CSRF token should be sent along with request.
          var csrfToken = getCookie('_csrf')
          console.log(csrfToken)
          console.log(idToken)
          // return postIdTokenToSessionLogin(
          //   '/sessionLogin',
          //   idToken,
          //   csrfToken
          // ).then(
          //   function() {
          //     // Redirect to profile on success.
          //     window.location.assign('/profile')
          //   },
          //   function(error) {
          //     // Refresh page on error.
          //     // In all cases, client side state should be lost due to in-memory
          //     // persistence.
          //     window.location.assign('/')
          //   }
          // )
        })
        // Do not automatically redirect.
        return false
      }
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
