export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'MealOrders',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        mealId: {
          type: Sequelize.UUID,
          references: {
            model: 'Meals',
            key: 'id',
          },
        },
        orderId: {
          type: Sequelize.UUID,
          references: {
            model: 'Orders',
            key: 'id',
          },
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

  down: queryInterface => queryInterface.dropTable('MealOrders')
};
