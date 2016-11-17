const authorizeRequest = require('./authorizeRequest')

const getAuthPolicy = (validateToken, policyAuthorizers) => (event, context, callback) => {
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
    stage: apiGatewayArnTmp[1],
    method: apiGatewayArnTmp[2],
    resourcePath: apiGatewayArnTmp[3]
  }
  validateToken(event.authorizationToken)
  .then(authorizeRequest(policyAuthorizers, awsAccountId, apiOptions))
  .then((policy) => callback(null, policy.build()))
  .catch((err) => {
    if (err) {
      console.log(err.stack)
    }
    // Send a 401 Unauthorized response to the client
    callback('Unauthorized')
  })
}

module.exports = getAuthPolicy
