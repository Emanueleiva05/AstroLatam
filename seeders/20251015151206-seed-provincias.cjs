"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Provincias", [
      {
        nombre: "Buenos Aires",
        idPais: 29,
      },
      {
        nombre: "New York",
        idPais: 30,
      },
      {
        nombre: "Tokyo",
        idPais: 32,
      },
      {
        nombre: "Kyoto",
        idPais: 32,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Provincias", null, {});
  },
};
