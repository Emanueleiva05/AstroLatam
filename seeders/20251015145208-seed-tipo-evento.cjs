"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoEventos", [
      {
        nombre: "Eclipse",
      },
      {
        nombre: "Tránsito",
      },
      {
        nombre: "Lluvia de meteoros",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoEventos", null, {});
  },
};
