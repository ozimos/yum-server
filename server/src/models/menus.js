export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  // Relations
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MealMenus',
      foreignKey: 'menuId',
      as: 'Meals',
    });
  };
  return Menu;
};
