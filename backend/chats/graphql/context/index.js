const { tokenExtractor } = require('../../../common/util/middleware')

module.exports = async ({ req }) => {
  try {
    await tokenExtractor(req, null, (err) => {
      if (err) {
        console.log(err)
      }
    })
    return {
      req,
    }
  } catch (err) {
    console.log(err)
  }
}
