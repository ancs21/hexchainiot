import ApolloClient from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import withApollo from 'next-with-apollo'

export default withApollo(({ headers = {} }) => {
  const ssrMode = !process.browser

  if (!ssrMode) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const isIn = auth !== null && auth.status === 'in'
    headers = isIn ? { Authorization: `Bearer ${auth.token}` } : {}
  }
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT_HTTP,
    headers
  })

  const wsLink =
    !ssrMode &&
    new WebSocketLink({
      uri: process.env.GRAPHQL_ENDPOINT_WS,
      options: {
        reconnect: true,
        connectionParams: {
          headers
        }
      }
    })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(err =>
        console.log(`[GraphQL error]: Message: ${err.message}`)
      )
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  let link = ApolloLink.from([errorLink, httpLink])

  if (!ssrMode) {
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      link
    )
  }

  const cache = new InMemoryCache({
    dataIdFromObject: ({ id, __typename }) =>
      id && __typename ? __typename + id : null
  })

  return new ApolloClient({ link, ssrMode, cache })
})
