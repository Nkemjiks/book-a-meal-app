module.exports = (sequelize, DataTypes) => {
  const orderItems = sequelize.define('orderItems', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    orderId: DataTypes.UUID,
    mealId: DataTypes.UUID,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal quantity is required' },
      },
    },
  }, {});

  return orderItems;
};
