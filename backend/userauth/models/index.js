const User = require('../../common/models/user')
const Session = require('../../common/models/session')

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  User, Session
}
