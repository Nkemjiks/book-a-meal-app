module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('menuItem', {
    mealId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
  }, {});

  return MealMenu;
};
