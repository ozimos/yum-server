export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {

    title: {
      type: DataTypes.STRING,
      defaultValue: 'Today',
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Standard Menu',
    }
  });

  // Relations
  Menu.associate = (models) => {
    Menu.hasMany(models.Meal, {
      foreignKey: 'menuTitle',
      as: 'Meals',
      onUpdate: 'CASCADE'
    });
  };
  return Menu;
};