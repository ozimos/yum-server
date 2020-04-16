module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Orders', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                },
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM(),
                values: ['pending', 'processing', 'dispatched', 'fulfilled'],
                defaultValue: 'pending',
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

    down: (queryInterface) => queryInterface.dropTable('Orders'),
};
