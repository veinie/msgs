const chatResolvers = require('./chat')
const messageResolvers = require('./message')
const userResolvers = require('./user')

module.exports = [chatResolvers, messageResolvers, userResolvers];
