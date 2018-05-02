export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCaterer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Relations
  User.associate = (models) => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
    });
  };

  return User;
};
