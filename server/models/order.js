module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toDateString(),
    },
    time: {
      type: DataTypes.STRING,
      defaultValue: new Date().toTimeString(),
    },
    userId: {
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
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Menu Id is required' },
      },
    },
  });
  order.associate = (models) => {
    order.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    order.belongsTo(models.menu, {
      foreignKey: 'menuId',
    });
  };
  return order;
};
