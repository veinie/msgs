const User = require('./user')
const Session = require('./session')
const Chat = require('./chat')
const Userchat = require('./userChat')
const Message = require('./message')

User.hasMany(Session)
Session.belongsTo(User)

Chat.belongsToMany(User, { through: Userchat})
User.belongsToMany(Chat, { through: Userchat })

User.hasMany(Message)
Chat.hasMany(Message)
Message.belongsTo(User)
Message.belongsTo(Chat)

module.exports = {
  User, Session, Chat, Userchat, Message
}
