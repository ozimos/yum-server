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
          type: Sequelize.DATE,
          defaultValue: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.DATE
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Menus')
};
