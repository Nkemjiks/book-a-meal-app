module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toDateString(),
    },
    time: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'User id required' },
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
    order.belongsToMany(models.meal, {
      through: 'orderItems',
    });
  };
  return order;
};
