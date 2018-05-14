export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Orders',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
            as: 'userId',
          },
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

  down: queryInterface => queryInterface.dropTable('Orders')
};
