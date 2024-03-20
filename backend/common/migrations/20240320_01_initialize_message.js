const { DataTypes, fn } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('messages', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true
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
    await queryInterface.addColumn('messages', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('messages', 'chat_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'chats', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('messages')
  },
}
