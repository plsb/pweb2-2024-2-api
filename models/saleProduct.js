'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const SaleProduct = sequelize.define('SaleProduct', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        saleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Sales',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });

    return SaleProduct;
};