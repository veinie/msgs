const { PubSub } = require('graphql-subscriptions')
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
      pubsub.publish(`MESSAGE_ADDED_TO_CHAT_${chatId}`, { newMessage: message })
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
      })
      return messages
    }
  },
  Subscription: {
    newMessage: {
      // subscribe: () => pubsub.asyncIterator('MESSAGE_ADDED')
      subscribe: (_, { chatId }) => {
        return pubsub.asyncIterator(`MESSAGE_ADDED_TO_CHAT_${chatId}`)
      }
    }
  }
}
