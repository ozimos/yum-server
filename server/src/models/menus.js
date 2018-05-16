export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {

    title: {
      type: DataTypes.STRING,
      defaultValue: 'Today',
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Default Menu',
    }
  });

  // Relations
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: 'MealMenus',
      foreignKey: 'menuTitle',
      as: 'Meals',
    });
  };
  return Menu;
};