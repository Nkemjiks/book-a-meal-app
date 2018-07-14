module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'users',
        'businessName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'users',
        'logoURL',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'users',
        'businessAddress',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('users', 'businessName'),
      queryInterface.removeColumn('users', 'logoURL'),
      queryInterface.removeColumn('users', 'businessAddress'),
    ];
  },
};
