module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      reference: {
        model: 'user',
        key: 'id',
        as: 'customerId',
      },
    },
    catererId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
    },
    mealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mealName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mealPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalCost: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    deliveryAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('orders'),
};
