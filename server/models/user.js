module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Your Full Name is required' },
        len: { args: [10, 40], msg: 'Full Name must be between 10 to 40 characters long' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'A User with this Email already exist, enter a different Email' },
      validate: {
        notEmpty: { args: true, msg: 'An Email Address is Required' },
        isEmail: { args: true, msg: 'A valid email address is Required' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'A Password is Required' },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Your Phone Number is required' },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer',
      validate: {
        notEmpty: { args: true, msg: 'Please provide a valid role name' },
        isIn: { args: [['customer', 'caterer']], msg: 'You can only be either a caterer or customer' },
      },
    },
  });
  user.associate = (models) => {
    user.hasMany(models.meal, {
      foreignKey: 'userId',
    });
  };
  return user;
};
