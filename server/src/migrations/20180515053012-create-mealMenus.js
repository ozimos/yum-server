export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'MealMenus',
      {
        mealId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'Meals',
            key: 'id',
          },
        },
        menuTitle: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: 'Menus',
            key: 'title',
          },
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

  down: queryInterface => queryInterface.dropTable('MealMenus')
};
