// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

// Importar modelos
const Personalized_breaths = require('./preferencesModel')(sequelize, Sequelize.DataTypes);
const Users = require('./usersModel')(sequelize, Sequelize.DataTypes);
const Images_category = require('./imagesModel')(sequelize, Sequelize.DataTypes);
const Categories = require('./categoriesModel')(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Sequelize,
  Personalized_breaths,
  Users,
  Images_category,
  Categories
};