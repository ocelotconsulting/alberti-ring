const validateToken = (token) => {
  // validate the incoming token
  // and produce the principal user identifier associated with the token

  // this could be accomplished in a number of ways:
  // 1. Call out to OAuth provider
  // 2. Decode a JWT token inline
  // 3. Lookup in a self-managed DB
  const principalId = 'user|a1b2c3d4'
  return Promise.resolve(principalId)
}

module.exports = validateToken
