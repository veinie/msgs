const User = require('./user')
const Session = require('./session')
const Chat = require('./chat')
const Userchat = require('./userChat')

User.hasMany(Session)
Session.belongsTo(User)

Chat.belongsToMany(User, { through: Userchat})
User.belongsToMany(Chat, { through: Userchat })

module.exports = {
  User, Session, Chat, Userchat
}
