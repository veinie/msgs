module.exports = `
  type Chat {
    id: Int!
    createdAt: String
    updatedAt: String
  }
  type Userchat {
    id: Int!
    createdAt: String,
    updatedAt: String,
    user_id: Int!
    chat_id: Int!
    requester_id: Int
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
`
