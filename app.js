const getAuthPolicy = require('./src/getAuthPolicy')
const openIDPrincipal = require('./src/policyAuthorizers/openIDPrincipal')

module.exports = { handler: getAuthPolicy([openIDPrincipal]) }
