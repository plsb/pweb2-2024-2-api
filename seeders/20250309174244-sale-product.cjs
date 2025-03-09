'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SaleProducts', [
      {
        saleId: 1,      // Primeira venda
        productId: 1,   // Smartphone XYZ
        unitPrice: 999.99,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        saleId: 1,      // Primeira venda
        productId: 2,   // Camiseta Básica
        unitPrice: 29.90,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        saleId: 2,      // Segunda venda
        productId: 2,   // Camiseta Básica
        unitPrice: 29.90,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SaleProducts', null, {});
  }
};