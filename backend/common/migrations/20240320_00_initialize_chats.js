const { DataTypes, fn } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('chats', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: fn('NOW')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: fn('NOW')
      },
    })
    await queryInterface.createTable('userchats', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: fn('NOW')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: fn('NOW')
      },
    })
    await queryInterface.addColumn('userchats', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('userchats', 'chat_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'chats', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('chats')
    await queryInterface.dropTable('userchats')
  },
}
