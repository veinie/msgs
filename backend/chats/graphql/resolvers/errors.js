const { GraphQLError } = require('graphql')

const authError = new GraphQLError(
  'Unauthorized', {
    extensions: {
      code: 'FORBIDDEN'
    }
  })

module.exports = {
  authError
}