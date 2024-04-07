module.exports = `
  type Message {
    id: Int!
    content: String
    chatId: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
  }
  type DeleteMessageResponse {
    success: Boolean!
    message: String!
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
    deleteMessage(
      id: Int!
    ): DeleteMessageResponse
  }
  type Query {
    getChatMessages(
      chatId: Int!
    ): [Message!]
  }
  type Subscription {
    newMessageToChat(chatId: Int!): Message!
  }
`
