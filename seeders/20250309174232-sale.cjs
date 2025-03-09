'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sales', [
      {
        saleDate: new Date('2025-03-01'),
        totalAmount: 1059.88, // Smartphone (999.99) + Camiseta (29.90) - Desconto (10.00)
        discount: 10.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        saleDate: new Date('2025-03-02'),
        totalAmount: 29.90, // Apenas Camiseta (29.90) sem desconto
        discount: 0.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};