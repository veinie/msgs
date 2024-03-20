const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Userchat extends Model {}

Userchat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'userchat',
})

module.exports = Userchat
