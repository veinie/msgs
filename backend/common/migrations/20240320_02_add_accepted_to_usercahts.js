const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('userchats', 'accepted', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('userchats', 'accepted')
  },
}
