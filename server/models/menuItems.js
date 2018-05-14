module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('menuItem', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    mealId: DataTypes.UUID,
    menuId: DataTypes.UUID,
  }, {});

  return MealMenu;
};
