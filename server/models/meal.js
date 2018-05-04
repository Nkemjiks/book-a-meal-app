module.exports = (sequelize, DataTypes) => {
  const meal = sequelize.define('meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Meal Name is required' },
        len: { args: [10, 40], msg: 'Meal Name must be between 10 to 40 characters long' },
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
  });
  meal.associate = (models) => {
    meal.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return meal;
};
