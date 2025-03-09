'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Pedro',
        email: 'pedro.barbosa@ifce.edu.br',
        password: '$2b$10$LTBAa9J4DCojKCSSCgsxLuBbsJ0BrqEPkxUyPZIvQSooCmlhiaj3K',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ana',
        email: 'ana@ifce.edu.br',
        password: '$2b$10$LTBAa9J4DCojKCSSCgsxLuBbsJ0BrqEPkxUyPZIvQSooCmlhiaj3K',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
