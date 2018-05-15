export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: 'email'
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },

        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isCaterer: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
          email: {
            fields: ['email']
          }
        }
      }
    ),

  down: queryInterface => queryInterface.dropTable('Users')
};
