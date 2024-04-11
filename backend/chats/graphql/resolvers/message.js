const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { Chat, Userchat, User, Message } = require('../../../common/models')
const { authError } = require('./errors') 


module.exports = {
  Mutation: {
    createMessage: async (_, { chatId, content }, context) => {
      if (!context.req.decodedToken) return authError
      console.log(context.req)
      const chat = Chat.findOne({
        include: {
          model: User,
          through: {
            model: Userchat,
            where: {
              user_id: context.req.decodedToken.id,
              chat_id: chatId
            }
          },
          required: true,
        }
      })
      if (!chat ) return new Error('Message mutation failed')
      const message = await Message.create({
        chatId,
        userId: context.req.decodedToken.id,
        content,
      })
      pubsub.publish('newMessageToChat', { chatId: message.chatId, newMessage: message })
      return message
    },
    updateMessage: async (_, { id, content }, context) => {
      if (!context.req.decodedToken) return authError
      const message = await Message.findByPk(id, {
        include: [{
          model: User
        }]
      })
      if (message.userId === context.req.decodedToken.id) {
        message.content = content
        await message.save()
        return message
      } else {
        throw new Error('unauthorized')
      }
    },
    deleteMessage: async (_, { id }, context) => {
      if (!context.req.decodedToken) return authError
      const message = await Message.findByPk(id)
      if (message && message.userId === context.req.decodedToken.id) {
        await message.destroy()
        return { success: true, message: 'Message deleted' }
      }
      return { success: false, message: 'something went wrong' }
    }
  },
  Query: {
    getChatMessages: async (_, { chatId }, context) => {
      if (!context.req.decodedToken) return authError
      const chat = await Chat.findByPk(chatId, {
        include: [{
          model: User,
          where: {
            id: context.req.decodedToken.id
          },
          required: true
        }]
      })
      if (!chat) return authError
      const messages = await Message.findAll({
        where: { chatId },
        include: [{
          model: User
        }]
      })
      return messages
    }
  },
  Subscription: {
    newMessageToChat: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newMessageToChat'),
        (payload, variables) => {
          return payload.chatId === variables.chatId
        }
      ),
      resolve: async (payload) => {
        return await Message.findByPk(payload.newMessage.id, {
          include: [{
            model: User
          }]
        })
      }
    }
  }
}
