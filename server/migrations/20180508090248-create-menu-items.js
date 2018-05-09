module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('menuItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    mealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'meals',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    menuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id',
      },
      onUpdate: 'CASCADE',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('MealMenus'),
};
