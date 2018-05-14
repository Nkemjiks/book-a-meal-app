require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 2859,
    database: 'book-a-meal',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: 'postgres',
    password: 2859,
    database: 'book-a-meal-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
};
