const AuthPolicy = require('../AuthPolicy')

const openIDPrincipalPolicyAuthorizer = (token, principalId) => {
  console.log('OpenID Authorizer')
  // TODO: Actually implement
  return Promise.resolve({
    allow: [{
      verb: AuthPolicy.HttpVerb().GET,
      resource: '/secrets/username/secretId'
    }],
    deny: []
  })
}

module.exports = openIDPrincipalPolicyAuthorizer
