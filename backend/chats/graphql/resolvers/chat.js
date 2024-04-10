const { request } = require('express')
const { PubSub, withFilter } = require('graphql-subscriptions')
const { literal, Op, QueryTypes} = require('sequelize')
const { Chat, Userchat, User, Message } = require('../../../common/models')
const { sequelize } = require('../../../common/util/db')
const pubsub = new PubSub()

module.exports = {
  Mutation: {
    createChat: async (_, { userId }, context) => {
      if (!context.req.decodedToken) throw new Error('You must be logged in')
      const requestingUser = await User.findByPk(context.req.decodedToken.id)
      const requestedUser = await User.findByPk(userId)
      if (!requestedUser) {
        throw new Error('Requested user not found')
      }
      let existingChatsIds = []
      let existingChats = []
      try {
        existingChatsIds = await sequelize.query(
          'SELECT chat_id FROM userchats WHERE user_id IN (:userIds) GROUP BY chat_id HAVING COUNT (DISTINCT user_id) = 2', {
            type: QueryTypes.SELECT,
            replacements: { userIds: [requestingUser.id, requestedUser.id] }
          }
        )
      } catch (err) {
        console.log(err)
      }
      if (existingChatsIds.length > 0) {
        existingChats = await Chat.findAll({
          where: {
            id: {
              [Op.in]: existingChatsIds.map(i => i.chat_id)
            }
          }
        })
      }
      if (existingChats.length > 0) {
        return existingChats.at(-1)
      } else {
          const newChat = await Chat.create()
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
          pubsub.publish('newChatRequest', { userId: requestedUser.id, requestId: requestedJoinEntry.id })
          return newChat
      }
      throw new Error('something happened')
    },
    acceptChatRequest: async (_, { requestId }, context) => {
      const request = await Userchat.findByPk(requestId)
      if (request.user_id === context.req.decodedToken.id) {
        request.accepted = true
        await request.save()
        return request
      }
    },
    declineChatRequest: async (_, { requestId }, context) => {
      const request = await Userchat.findByPk(requestId)
      if (!context.req.decodedToken.id || request.user_id !== context.req.decodedToken.id) {
        throw new Error('Unauthorized')
      }
      try {
        await request.destroy()
        return { success: true, message: 'Declined request', requestId }
      } catch (error) {
        console.log(error)
        return { success: false, message: 'Failed to decline request', requestId }
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
        }],
      })
      let users = []
      if (chats) {
        users = await User.findAll({
          include: [{
            model: Chat,
            through: {
              where: {
                id: {
                  [Op.in]: chats.map(c => c.id)
                }
              }
            }
          }]
        })
      }
      if (users) {
        chats.forEach(c => {
          c.users = users.filter(u => u.chats.map(c => c.id).includes(c.id))
        })
      }
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
    getChatMessages: async(_, { chatId }, context) => {
      if (!context.req.decodedToken) return new Error('invalid token')
      const isUserchat = await Userchat.findOne({
        where: {
          chat_id: chatId,
          user_id: context.req.decodedToken.id
        }
      })
      if (!isUserchat) return new Error('unauthorized')
      const messages = await Message.findAll({
        where: {
          chat_id: chatId
        },
        include: [{
          model: User
        }]
      })
      return messages
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
  },
  Subscription: {
    newChatRequest: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newChatRequest'),
        (payload, variables) => {
          return payload.userId === variables.userId
        }
      ),
      resolve: async (payload) => {
        return await Userchat.findByPk(payload.requestId, {
          include: [{
            model: User,
            as: 'requester',
            foreignKey: 'requester_id'
          }]
        })
      }
    }
  }
}
