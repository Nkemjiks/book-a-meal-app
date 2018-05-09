module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toDateString(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'User Id is required' },
      },
    },
  });
  menu.associate = (models) => {
    menu.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    menu.belongsToMany(models.meal, {
      through: 'menuItems',
    });
    // menu.hasMany(models.order, {
    //   foreignKey: 'menuId',
    // });
  };
  return menu;
};
