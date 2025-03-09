'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {

    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        }
    });

    Product.associate = (models) => {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId'});
      Product.belongsToMany(models.Sale, {
        through: models.SaleProduct,
        foreignKey: 'productId'
      });
    }

    return Product;
};