module.exports = `
  type Chat {
    id: Int!
    createdAt: String
    updatedAt: String
    messages: [Message!]
    users: [User]
  }
  type Userchat {
    id: Int!
    createdAt: String,
    updatedAt: String,
    userId: Int!
    chatId: Int!
    requesterId: Int
    accepted: Boolean
  }
  type Mutation {
    createChat(
      userId: Int!
      username: String!
    ): Chat
    acceptChatRequest(
      requestId: Int!
    ): Chat
  }
  type Query {
    getUserChats: [Chat!]
    getChatRequests: [Userchat!]
  }
  type Subscription {
    newMessage(chatId: Int!): Message!
  }
`
