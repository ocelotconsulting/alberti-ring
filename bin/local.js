const cert = require('../app.js')

const testCallback = (data) => {
  console.log(data)
  process.exit(0)
}

cert.handler({}, {}, testCallback)
