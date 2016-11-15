const AuthPolicy = require('../AuthPolicy')

const openIDPrincipalPolicyAuthorizer = (tokenValidation) => {
  console.log('OpenID Authorizer')
  // TODO: Actually implement
  return Promise.resolve({
    allow: [{
      verb: AuthPolicy.HttpVerb().GET,
      resource: `/${encodeURIComponent(tokenValidation['principal'])}/*`
    }],
    deny: []
  })
}

module.exports = openIDPrincipalPolicyAuthorizer
