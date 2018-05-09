module.exports = (sequelize, DataTypes) => {
  const meal = sequelize.define('meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'A meal with that name already exists, enter a different meal name' },
      validate: {
        notEmpty: { args: true, msg: 'Meal Name is required' },
      },
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'A link to the image is required' },
        isUrl: { args: true, msg: 'Please provide a valid link to the image' },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal Price is required' },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'user id required' },
      },
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
  meal.associate = (models) => {
    meal.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    meal.belongsToMany(models.menu, {
      through: 'menuItems',
    });
  };
  return meal;
};
