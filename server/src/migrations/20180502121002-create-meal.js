export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Meals',
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
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: 'title'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      },
      // migration files do not add unique constraints in the same way as model definitions
      // as documented at https://github.com/sequelize/cli/issues/272
      // using the queryInterface.addConstraints method in a separate migration file works
      // sometimes and fails inexplicably at others. uniqueKeys preferrable
      {
        uniqueKeys: {
          title: {
            fields: ['title']
          }
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Meals')
};
