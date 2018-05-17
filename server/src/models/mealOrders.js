export default (sequelize, DataTypes) => {
  const MealOrders = sequelize.define('MealOrders', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 1,
      validate: {
        isInt: true,
        min: 1
      }
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'Orders',
        key: 'id',
      }
    },
    mealId: {
      type: DataTypes.UUID,
      references: {
        model: 'Meals',
        key: 'id',
      }
    },
  });


  return MealOrders;
};