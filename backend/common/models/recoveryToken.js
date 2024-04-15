const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class RecoveryToken extends Model {}

RecoveryToken.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'recoverytoken',
})

module.exports = RecoveryToken
