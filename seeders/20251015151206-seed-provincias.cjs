"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Provincias", [
      {
        nombre: "Buenos Aires",
        idPais: 1,
      },
      {
        nombre: "New York",
        idPais: 2,
      },
      {
        nombre: "Tokyo",
        idPais: 3,
      },
      {
        nombre: "Kyoto",
        idPais: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Provincias", null, {});
  },
};
