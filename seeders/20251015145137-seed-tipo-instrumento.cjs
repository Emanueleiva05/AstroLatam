"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoInstrumentos", [
      {
        nombre: "Telescopio",
        descripcion: "Instrumento óptico para observar objetos lejanos",
      },
      {
        nombre: "Binocular",
        descripcion:
          "Dispositivo óptico de dos tubos para visión estereoscópica",
      },
      {
        nombre: "Cámara CCD",
        descripcion: "Cámara digital usada en astronomía",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoInstrumentos", null, {});
  },
};
