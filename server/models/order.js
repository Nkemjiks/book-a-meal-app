module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toDateString(),
    },
    time: {
      type: DataTypes.STRING,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'User Id is required' },
      },
    },
    catererId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Caterer\'s Id is required' },
      },
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal Id is required' },
      },
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal Name is required' },
      },
    },
    mealPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal Price is required' },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal quantity is required' },
      },
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Total cost is required' },
      },
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  order.associate = (models) => {
    order.belongsTo(models.user, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };
  return order;
};
