const AuthPolicy = require('./AuthPolicy')

const addPolicyDecisions = (policy) => (decisions) => {
  if (decisions.allow) {
    decisions.allow.forEach((allowance) => policy.allowMethod(allowance.verb, allowance.resource))
  }
  if (decisions.deny) {
    decisions.deny.forEach((denial) => policy.denyMethod(denial.verb, denial.resource))
  }
}

const authorizeRequest = (policyAuthorizers, token, awsAccountId, apiOptions) => (principalId) => {
  // if the token is valid, a policy must be generated which will allow or deny access to the client

  // The token and context/event should be inspected now to determine which methods
  // the request can access to derive secrets.

  // For example, if this authorizer is allowing any request having a certain IAM
  // role to access secrets pertaining to that specific request, then it would allow
  // certain requests through which access only the roles secrets

  // If the authorizer is allowing a validated OpenID token to access only a principal's
  // stored secrets, then it should only allow requests which access only the principal's secrets.

  // Likewise if the authorizer was set up for an externally defined role, org, etc

  // if access is denied, the client will recieve a 403 Access Denied response
  // if access is allowed, API Gateway will proceed with the backend integration configured on the method that was called

  /*
  const method = apiGatewayArnTmp[2];
  let resource = '/'; // root resource
  if (apiGatewayArnTmp[3]) {
      resource += apiGatewayArnTmp[3];
  }
  */

  // this function must generate a policy that is associated with the recognized principal user identifier.
  // depending on your use case, you might store policies in a DB, or generate them on the fly

  // keep in mind, the policy is cached for 5 minutes by default (TTL is configurable in the authorizer)
  // and will apply to subsequent calls to any method/resource in the RestApi
  // made with the same token

  // the example policy below denies access to all resources in the RestApi
  const policy = new AuthPolicy(principalId, awsAccountId, apiOptions)
  return Promise.all(policyAuthorizers.map(policyAuthorizer => policyAuthorizer(token, principalId)))
  .then((authZDecisions) => {
    authZDecisions.map(addPolicyDecisions(policy))
    policy.denyAllMethods()
    return policy
  })
}

module.exports = authorizeRequest
