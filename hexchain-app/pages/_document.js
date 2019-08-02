import Document, { Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../styletron'

class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))
    const stylesheets = styletron.getStylesheets() || []
    return { ...page, stylesheets }
  }

  render() {
    return (
      <html>
        <Head>
          {/* <link href="/static/css/main.css" rel="stylesheet" /> */}
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body style={{ margin: '0px', backgroundColor: '#e9ebee' }}>
          <Main />
          <NextScript />

          <script src="/static/js/main.js" />
        </body>
      </html>
    )
  }
}

export default MyDocument
