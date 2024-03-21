module.exports = `
  type Message {
    id: Int!
    content: String
    userId: Int!
    chatId: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createMessage(
      chatId: Int!
      content: String!
    ): Message!
    updateMessage(
      chatId: Int!
      id: Int!
      content: String
    ): Message
  }
  type Query {
    getChatMessages(
      chatId: Int!
    ): [Message!]
  }
`
