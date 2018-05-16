module.exports = (sequelize, DataTypes) => {
  const orderItems = sequelize.define('orderItems', {
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
