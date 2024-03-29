const { Op } = require('sequelize')
const { GraphQLError } = require('graphql')
const { User } = require('../../../common/models')


module.exports = {
  Query: {
    findUser: async (_, { search }, context) => {
      if (!isNaN(search) && !isNaN(parseFloat(search))) {
        const searchUserId = Number(search)
        const users = await User.findAll({
          where: {
            [Op.or]: [
              { username: { [Op.iLike]: `%${search}%` } },
              { id: searchUserId }
            ]
          }
        })
        return users
      }

      const users = await User.findAll({
        where: {
          username: {
            [Op.iLike]: `%${search}%`
          }
        }
      })
      return users
    }
  },
}
