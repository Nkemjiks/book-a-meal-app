module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Your Full Name is required' },
        len: { args: [5, 40], msg: 'Full Name must be between 10 to 40 characters long' },
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Your address is required' },
        len: { args: [5, 200], msg: 'Your address should be between 10 to 40 characters long' },
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
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  user.associate = (models) => {
    user.hasMany(models.meal, {
      foreignKey: 'userId',
    });
    user.hasMany(models.menu, {
      foreignKey: 'userId',
    });
    user.hasMany(models.order, {
      foreignKey: 'userId',
    });
  };
  return user;
};
