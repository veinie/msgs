const { request } = require('express')
const { literal, Op } = require('sequelize')
const { Chat, Userchat, User, Message } = require('../../../common/models')

module.exports = {
  Mutation: {
    createChat: async (_, { userId }, context) => {
      if (!context.req.decodedToken) throw new Error('You must be logged in')
      const requestingUser = await User.findByPk(context.req.decodedToken.id)
      const requestedUser = await User.findByPk(userId)
      if (!requestedUser) {
        throw new Error('Requested user not found')
      }
      const newChat = await Chat.create()
      // console.log(newChat.dataValues.id)
      await requestingUser.addChat(newChat)
      await requestedUser.addChat(newChat)
      const requesterJoinEntry = await Userchat.findOne({
        where: {
          user_id: requestingUser.id,
          chat_id: newChat.id
        }
      })
      requesterJoinEntry.accepted = true
      console.log(requesterJoinEntry)
      await requesterJoinEntry.save()
      console.log(requesterJoinEntry)
      const requestedJoinEntry = await Userchat.findOne({
        where: {
          user_id: requestedUser.id,
          chat_id: newChat.id
        }
      })
      requestedJoinEntry.requester_id = requestingUser.id
      await requestedJoinEntry.save()
      console.log(requestedJoinEntry)
      return newChat
    },
    acceptChatRequest: async (_, { requestId }, context) => {
      const request = await Userchat.findByPk(requestId)
      console.log(request)
      if (request.user_id === context.req.decodedToken.id) {
        request.accepted = true
        await request.save()
        return request
        // const chat = await Chat.findByPk(request.chatId)
        // return chat
      }
    }
  },
  Query: {
    getUserChats: async (_, _args, context) => {
      if (!context.req.decodedToken) return new Error('invalid token')
      const chats = await Chat.findAll({
        include: [{
          model: User,
          where: { id: context.req.decodedToken.id },
          through: {
            where: { accepted: true }
          },
          required: true,
        }, {
          model: Message,
          include: [{
            model: User
          }]
        }],
      })
      return chats
    },
    getChatUsers: async(_, { chatId }, context) => {
      const users = await User.findAll({
        include: [{
          model: Chat,
          through: {
            where: { accepted: true }
          }
        }]
      })
      return users
    },
    getChatRequests: async (_, _args, context) => {
      if (!context.req.decodedToken) return new Error('invalid token')
      const requests = await Userchat.findAll({
        where: {
          user_id: context.req.decodedToken.id,
          accepted: false
        },
        // required: true,
        include: [{
          model: User,
          as: 'requester',
          foreignKey: 'requester_id'
        }]
      })
      return requests
    }
  }
}
