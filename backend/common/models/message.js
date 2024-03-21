const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'message',
})

module.exports = Message
