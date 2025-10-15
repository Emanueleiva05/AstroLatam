"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoCondiciones", [
      { nombre: "Humedad" },
      { nombre: "Nubosidad" },
      { nombre: "Transparencia" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoCondiciones", null, {});
  },
};
