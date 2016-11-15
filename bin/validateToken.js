const validate = require('../src/validateAuth0Token.js')

const testCallback = (data) => {
  console.log(JSON.stringify(data))
}

validate('blah') // substitute with openid token value
.then(testCallback)
.then(() => validate('Bearer blah') // substitute 'blah' with access token value
  .then(testCallback)
)
.then(() => process.exit(0))
.catch((err) => {
  if (err) {
    console.log(err.stack)
  }
})
