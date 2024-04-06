module.exports = `
  type Chat {
    id: Int!
    createdAt: String
    updatedAt: String
    users: [User]
  }
  type Userchat {
    id: Int!
    createdAt: String
    updatedAt: String
    user_id: Int!
    chat_id: Int!
    requester: User
    accepted: Boolean!
  }
  type Mutation {
    createChat(
      userId: Int!
    ): Chat
    acceptChatRequest(
      requestId: Int!
    ): Chat
  }
  type Query {
    getUserChats: [Chat!]
    getChatRequests: [Userchat!]
    getChatUsers(
      chatId: Int!
    ): [User]
    getChatMessages(
      chatId: Int!
    ): [Message]
  }
  type Subscription {
    newChatRequest(userId: Int!): Userchat!
  }
`
