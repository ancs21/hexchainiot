import React from 'react'
import App, { Container } from 'next/app'
import { LightTheme, BaseProvider } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { ContextOneProvider } from '../store'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

import { styletron, debug } from '../styletron'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // this exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { Component, apollo, pageProps } = this.props
    return (
      <Container>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={LightTheme}>
            <ContextOneProvider>
              <ApolloProvider client={apollo}>
                <Component {...pageProps} />
              </ApolloProvider>
            </ContextOneProvider>
          </BaseProvider>
        </StyletronProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
