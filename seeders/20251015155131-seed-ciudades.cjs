"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ciudades", [
      {
        nombre: "Florencio varela",
        idProvincia: 1,
      },
      {
        nombre: "Manhattan",
        idProvincia: 2,
      },
      {
        nombre: "Shibuya",
        idProvincia: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ciudades", null, {});
  },
};
