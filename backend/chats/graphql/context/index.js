const { tokenExtractor } = require('../../../common/util/middleware')

module.exports = async ({ req }) => {
  try {
    tokenExtractor(req, null, (err) => {
      if (err) { console.log(err) }
    })
    return {
      req,
    }
  } catch (error) {
    console.log(error)
  }

};
