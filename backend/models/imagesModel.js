'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Images_category extends Model {
    static associate(models) {
      // Asociación: muchos Images_categories pertenecen a una categoría
      Images_category.belongsTo(models.Categories, {
        foreignKey: 'id_category',
        as: 'Categories',
      });
    }
  }

  Images_category.init(
    {
      id_image: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // nombre de la tabla en la base de datos
          key: 'id_category',
        },
      },
      url_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Images_category',
      timestamps: false
    }
  );

  return Images_category;
};