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
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  order.associate = (models) => {
    order.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    order.belongsToMany(models.meal, {
      through: 'orderItems',
    });
  };
  return order;
};
