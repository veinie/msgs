const { tokenExtractor } = require('../../../common/util/middleware')

module.exports = async ({ req }) => {
  tokenExtractor(req, null, () => {})
  return {
    req,
  }
};