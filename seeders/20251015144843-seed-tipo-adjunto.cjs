"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoAdjuntos", [
      { nombre: "Imagen" },
      { nombre: "Archivo" },
      { nombre: "Video" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoAdjuntos", null, {});
  },
};
