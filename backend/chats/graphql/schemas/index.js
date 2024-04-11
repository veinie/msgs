const userType = require('./user')
const chatType = require('./chat')
const messageType = require('./message')

const rootType = `
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`

module.exports = [rootType, userType, chatType, messageType]
