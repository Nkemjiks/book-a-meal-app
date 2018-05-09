module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('menus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    date: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      reference: {
        model: 'user',
        key: 'id',
        as: 'userId',
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('menus'),
};
