"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoObjetos", [
      {
        nombre: "Estrella",
        descripcion: "Cuerpo celeste que emite luz propia",
      },
      {
        nombre: "Planeta",
        descripcion: "Cuerpo celeste que orbita una estrella",
      },
      {
        nombre: "Galaxia",
        descripcion: "Conjunto masivo de estrellas, gas y materia oscura",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoObjetos", null, {});
  },
};
