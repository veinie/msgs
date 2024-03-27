const { Chat, Userchat, User, Message } = require('../../../common/models')

module.exports = {
  Mutation: {
    createMessage: async (_, { chatId, content }, context) => {
      const userChat = await Userchat.findOne({
        where: {
          userId: context.req.decodedToken.id,
          chatId: chatId
        }
      })
      const chat = Chat.findByPk(chatId)
      if (!chat || !userChat) throw new Error('Message mutation failed')
      const message = await Message.create({
        chatId,
        userId: context.req.decodedToken.id,
        content,
      })
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
  }
}
