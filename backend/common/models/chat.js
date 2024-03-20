const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Chat extends Model {}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'chat',
})

module.exports = Chat
