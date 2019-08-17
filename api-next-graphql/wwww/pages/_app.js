import React from 'react'
import Head from 'next/head'
import App, { Container } from 'next/app'
import { red } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ProvideAuth } from '../components/use-auth'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fafafa'
    }
  }
})

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <ProvideAuth>
            <ApolloProvider client={apolloClient}>
              <CssBaseline />
              <Component {...pageProps} />
            </ApolloProvider>
          </ProvideAuth>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
