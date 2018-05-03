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
          defaultValue: 'Standard Menu',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Menus')
};
