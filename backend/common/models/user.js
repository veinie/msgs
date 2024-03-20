const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
    validate: {
        customValidator(value) {
            const re = /^.{2,32}$/
            if (!re.exec(value)) {
                throw new Error("Username must be between 2 and 32 characters of length.")
            }
        }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      customValidator(value) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!re.exec(value)) {
          throw new Error("Email must be a valid email address.")
        }
      }
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: /[$]2[abxy]?[$](?:0[4-9]|[12][0-9]|3[01])[$][./0-9a-zA-Z]{53}/
    }
  }, 
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  confirmationCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  defaultScope: {
    attributes: { exclude: ['passwordHash', 'email'] }
  },
  scopes: {
    unlimited: { attributes: {}}
  },
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
})

module.exports = User
