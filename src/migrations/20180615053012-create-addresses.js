module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Addresses', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                    onDelete: 'cascade',
                },
            },
            street1: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            street2: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lga: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            areaCode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            defaultAddress: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        }),

    down: (queryInterface) => queryInterface.dropTable('Addresses'),
};
