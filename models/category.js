'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, { foreignKey: 'categoryId'});
    }

    return Category;
}