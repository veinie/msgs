module.exports = `
  type Chat {
    id: Int!
    updatedAt: String!
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
