export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Menus',
      {
        title: {
          type: Sequelize.STRING,
          primaryKey: true,
          defaultValue: 'Today',
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: 'Default Menu',
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
