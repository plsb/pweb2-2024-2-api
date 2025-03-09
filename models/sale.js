'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Sale = sequelize.define('Sale', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        saleDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        }
    });

    Sale.associate = (models) => {
        Sale.belongsToMany(models.Product, {
            through: models.SaleProduct,
            foreignKey: 'saleId'
        });
    };

    return Sale;
};