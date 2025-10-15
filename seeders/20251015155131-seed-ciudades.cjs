"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ciudades", [
      {
        nombre: "Florencio varela",
        idProvincia: 17,
      },
      {
        nombre: "Manhattan",
        idProvincia: 18,
      },
      {
        nombre: "Shibuya",
        idProvincia: 19,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ciudades", null, {});
  },
};
