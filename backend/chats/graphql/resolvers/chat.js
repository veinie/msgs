const { request } = require('express')
const { Op } = require('sequelize')
const { Chat, Userchat, User } = require('../../../common/models')

module.exports = {
  Mutation: {
    createChat: async (_, { username, userId }, context) => {
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
      return chat
    },
    acceptChatRequest: async (_, { requestId }, context) => {
      const request = await Userchat.findByPk(requestId)
      if (request.userId === context.req.decodedToken.id) {
        request.accepted = true
        await request.save()
        const chat = await Chat.findByPk(request.chatId)
        return chat
      }
    }
  },
  Query: {
    getUserChats: async (_, _args, context) => {
      const chats = await Chat.findAll({
        include: [{
          model: User,
          through: {
            model: Userchat,
            where: {
              userId: context.req.decodedToken.id,
              accepted: true
            }
          },
          required: true,
        }],
      })
      return chats
    },
    getChatRequests: async (_, _args, context) => {
      const requests = await Userchat.findAll({
        where: {
          userId: context.req.decodedToken.id,
          accepted: false
        }
      })
      return requests
    }
  }
}
