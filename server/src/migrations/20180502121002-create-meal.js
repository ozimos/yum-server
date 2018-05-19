export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Meals', {
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
            onDelete: 'CASCADE'
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
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        }
      },
      // migration files do not add unique constraints in the same way as model definitions
      // as documented at https://github.com/sequelize/cli/issues/272
      // using the queryInterface.addConstraints method in a separate migration file works
      // sometimes and fails inexplicably at others. uniqueKeys preferrable
      {
        uniqueKeys: {
          userTitle: {
            fields: ['title', 'userId']
          }
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Meals')
};