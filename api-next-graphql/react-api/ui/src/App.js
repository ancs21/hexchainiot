import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { Router } from '@reach/router'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import theme from './theme'
import { ProvideAuth } from './components/use-auth'
import Index from './pages/index'
import Login from './pages/login'
import G from './pages/g'
import Device from './pages/device'

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ProvideAuth>
      <ApolloProvider client={client}>
        <Router>
          <Index path="/" />
          <Login path="/login" />
          <G path="/g" />
          <Device path="/:id" />
        </Router>
      </ApolloProvider>
    </ProvideAuth>
  </ThemeProvider>
)

export default App
