export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      }
    },
    {
      scopes: {
        includeMealsUsers() {
          return {
            include: [{
              association: 'Meals',
              required: false,
              paranoid: false,
              attributes: ['id', 'userId', 'title', 'description', 'price'],
              through: {
                attributes: ['quantity']
              }
            },
            {
              association: 'User',
              attributes: ['firstName', 'lastName', 'email']
            }]
          };
        },
        forCaterers(userId) {
          return {
            include: [{
              association: 'Meals',
              where: { userId },
              required: false,
              paranoid: false,
              attributes: ['id', 'userId', 'title', 'description', 'price'],
              through: {
                attributes: ['quantity']
              }
            },
            {
              association: 'User',
              attributes: ['firstName', 'lastName', 'email']
            }]
          };
        }
      }
    }
  );

  // Relations
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Order.belongsToMany(models.Meal, {
      through: 'MealOrders',
      foreignKey: 'orderId',
      as: 'Meals',
    });
  };

  return Order;
};
