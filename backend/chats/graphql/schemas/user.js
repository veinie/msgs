module.exports = `
  type User {
    id: Int!
    username: String!
  }
  type Query {
    findUser(search: String!): [User]
  }
`
