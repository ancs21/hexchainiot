/**
 * Executes shell command and return as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */

exports.execShell = cmd => {
  const { exec } = require('child_process')
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

/**
 * Check device id exists in store key
 * @param cmd {string}
 * @return {Promise<string>}
 */

exports.isDeviceExists = deviceId => {
  const fs = require('fs')
  return fs.existsSync(`/root/.sawtooth/keys/${deviceId}.pub`)
}
