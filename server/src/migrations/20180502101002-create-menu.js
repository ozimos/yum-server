export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Menus',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Menus')
};
