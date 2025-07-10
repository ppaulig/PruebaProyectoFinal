'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Personalized_breaths extends Model {
    static associate(models) {
      // Asociación: muchos Personalized_breaths pertenecen a un usuario
      Personalized_breaths.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as: 'Users',
      });
    }
  }

  Personalized_breaths.init(
    {
      id_breath: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // nombre de la tabla en la base de datos
          key: 'id_user',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inhale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exhale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cycles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Personalized_breaths',
    }
  );

  return Personalized_breaths;
};