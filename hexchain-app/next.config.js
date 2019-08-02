const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  webpack: function(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.externals = config.externals || {}
    config.externals['styletron-server'] = 'styletron-server'
    return config
  }
}
