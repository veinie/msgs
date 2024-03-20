const { request } = require('express')
const { Chat, Userchat, User } = require('../../../common/models')

module.exports = {
  Mutation: {
    async createChat(_, { username, userId }, context) {
      if (!context.req.decodedToken) throw new Error('You must be logged in')
      const requestedUser = await User.findOne({
        where: {
          username: username,
          id: userId
        }
      })
      if (!requestedUser) {
        throw new Error('Requested user not found')
      }
      const chat = await Chat.create()
      await Userchat.create({ chatId: chat.id, userId: context.req.decodedToken.id, accepted: true })
      await Userchat.create({ chatId: chat.id, userId: requestedUser.id })
    } 
  },
  Query: {
    async getUserChats(_, _args, context) {
      const chats = await Chat.findAll({
        include: [{
          model: User,
          through: 'userchats',
          where: { id: context.req.decodedToken.id }
        }]
      })
      return chats
    }
  }
}
