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
      console.log(newChat.dataValues.id)
      await requestingUser.addChat(newChat)
      await requestedUser.addChat(newChat)
      const requesterJoinEntry = await Userchat.findOne({
        where: {
          userId: requestingUser.dataValues.id,
          chat_id: newChat.dataValues.id
        }
      })
      requesterJoinEntry.accepted = true
      await requesterJoinEntry.save()
      console.log(requesterJoinEntry)
      const requestedJoinEntry = await Userchat.findOne({
        where: {
          userId: requestedUser.dataValues.id,
          chat_id: newChat.dataValues.id
        }
      })
      requestedJoinEntry.requesterId = requestingUser.dataValues.id
      await requestedJoinEntry.save()
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
      const chats = await Chat.findAll({
        include: [{
        //   model: User,
        //   through: {
        //     model: Userchat,
        //     where: {
        //       userId: context.req.decodedToken.id,
        //       accepted: true
        //     }
        //   },
        //   required: true,
        // }, {
        //   model: User,
        //   through: {
        //     model: Userchat,
        //     where: {
        //       accepted: true
        //     }
        //   }
          model: User,
          where: { id: context.req.decodedToken.id },
          through: {
            where: { accepted: true }
          }
        }, {
          model: Message,
          include: [{
            model: User
          }]
        }],
      })
      return chats
    },
    getChatRequests: async (_, _args, context) => {
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
