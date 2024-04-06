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
      const message = await Message.findOne({
        where: {
          chatId,
          id,
          userId: context.req.decodedToken.id
        }
      })
      message.content = content
      await message.save()
      return message
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
