module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('menuItems', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mealId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'meals',
        key: 'id',
        as: 'mealId',
      },
      onDelete: 'CASCADE',
    },
    menuId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id',
        as: 'menuId',
      },
      onDelete: 'CASCADE',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('menuItems'),
};
