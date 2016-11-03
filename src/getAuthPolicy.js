const validateToken = require('./validateToken')
const authorizeRequest = require('./authorizeRequest')

const getAuthPolicy = (policyAuthorizers) => (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2))
  console.log('Client token:', event.authorizationToken)
  console.log('Method ARN:', event.methodArn)
  // build apiOptions for the AuthPolicy
  const tmp = event.methodArn.split(':')
  const apiGatewayArnTmp = tmp[5].split('/')
  const awsAccountId = tmp[4]
  const apiOptions = {
    region: tmp[3],
    restApiId: apiGatewayArnTmp[0],
    stage: apiGatewayArnTmp[1]
  }
  validateToken(event.authorizationToken)
  .then(authorizeRequest(policyAuthorizers, event.authorizationToken, awsAccountId, apiOptions))
  .then((policy) =>
    // finally, build the policy and exit the function
    callback(null, policy.build())
  )
  .catch((err) => {
    if (err) {
      console.log(err.stack)
    }
    // Send a 401 Unauthorized response to the client
    callback('Unauthorized')
  })
}

module.exports = getAuthPolicy
