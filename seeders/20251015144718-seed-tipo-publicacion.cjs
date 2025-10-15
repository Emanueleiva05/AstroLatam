"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoPublicaciones", [
      {
        nombre: "Guía",
        descripcion: "Publicaciones orientadas a instruir o enseñar",
      },
      {
        nombre: "Análisis",
        descripcion: "Publicaciones técnicas con profundidad científica",
      },
      {
        nombre: "Divulgación",
        descripcion: "Publicaciones simples para difusión general",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoPublicaciones", null, {});
  },
};
