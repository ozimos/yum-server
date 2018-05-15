export default (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'title'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  // Relations
  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Meal.belongsToMany(models.Menu, {
      through: 'MealMenus',
      foreignKey: 'mealId',
      as: 'Menus',
      onUpdate: 'CASCADE'
    });
    Meal.belongsToMany(models.Order, {
      through: 'MealOrders',
      foreignKey: 'mealId',
      as: 'Orders',
      onUpdate: 'CASCADE'
    });
  };

  return Meal;
};