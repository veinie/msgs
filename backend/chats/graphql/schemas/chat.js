module.exports = `
  type Chat {
    id: Int!
    createdAt: String
    updatedAt: String
  }
  type Mutation {
    createChat(
      userId: Int!
      username: String!
    ): Chat
  }
  type Query {
    getUserChats: [Chat!]
  }
`
