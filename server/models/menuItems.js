module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('menuItem', {
    mealId: DataTypes.UUID,
    menuId: DataTypes.UUID,
  }, {});

  return MealMenu;
};
