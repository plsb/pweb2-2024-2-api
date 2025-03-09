'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Smartphone XYZ',
        categoryId: 1, // Referencia a categoria "Eletrônicos"
        price: 999.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Camiseta Básica',
        categoryId: 2, // Referencia a categoria "Roupas"
        price: 29.90,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};