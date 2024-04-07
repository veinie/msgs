const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { Chat, Userchat, User, Message } = require('../../../common/models')


module.exports = {
  Mutation: {
    createMessage: async (_, { chatId, content }, context) => {
      const chat = Chat.findOne({
        include: {
          model: User,
          through: {
            model: Userchat,
            where: {
              userId: context.req.decodedToken.id,
              chatId
            }
          },
          required: true,
        }
      })
      if (!chat ) throw new Error('Message mutation failed')
      const message = await Message.create({
        chatId,
        userId: context.req.decodedToken.id,
        content,
      })
      pubsub.publish('newMessageToChat', { chatId: message.chatId, newMessage: message });
      return message
    },
    updateMessage: async (_, { chatId, id, content }, context) => {
      if (!context.req.decodedToken) return new Error('invalid token')
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
      if (!context.req.decodedToken) return new Error('invalid token')
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
