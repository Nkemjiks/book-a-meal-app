module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
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
    userId: {
      type: DataTypes.UUID,
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
  };
  return menu;
};
