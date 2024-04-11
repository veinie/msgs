const { tokenExtractor } = require('../../../common/util/middleware')

module.exports = async ({ req }) => {
  try {
    await new Promise((resolve, reject) => {
      tokenExtractor(req, null, (error) => {
        if (error) {
          console.log(error)
          reject(error)
          throw error
        } else {
          resolve()
        }
      })
    })
    return {
      req,
    }
  } catch (error) {
    console.log(error)
    throw new AuthenticationError('Authentication failed')
  }
}
