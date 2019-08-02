const { exec } = require('child_process')

/**
 * Executes shell command and return as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */

const execShell = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

// use
execShell('ls -al')
  .then(d => console.log(d))
  .catch(e => console.log(e))
