export default (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        street1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lga: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        areaCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        defaultAddress: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    // Relations
    Address.associate = (models) => {
        Address.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return Address;
};
