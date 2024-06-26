const User = require('./user')
const Session = require('./session')
const Chat = require('./chat')
const Userchat = require('./userChat')
const Message = require('./message')
const RecoveryToken = require('./recoveryToken')

User.hasMany(Session)
Session.belongsTo(User)

Chat.belongsToMany(User, { through: Userchat, foreignKey: 'chat_id' })
User.belongsToMany(Chat, { through: Userchat, foreignKey: 'user_id' })
Userchat.belongsTo(User, { foreignKey: 'requester_id', as: 'requester' })
Userchat.belongsTo(Chat, { foreignKey: 'chat_id' })
Chat.hasMany(Userchat, { foreignKey: 'chat_id' })

User.hasMany(Message)
Chat.hasMany(Message)
Message.belongsTo(User)
Message.belongsTo(Chat)

RecoveryToken.belongsTo(User, {
  onDelete: 'CASCADE'
})
User.hasMany(RecoveryToken)

module.exports = {
  User, Session, Chat, Userchat, Message, RecoveryToken
}
