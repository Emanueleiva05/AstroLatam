"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Instrumentos", [
      {
        nombre: "Celereon",
        descripcion: "Telescopio astronomico",
        apertura: 50,
        distancia_focal: 200,
        tipo_telescopio: "Refractores",
        aumento: 0,
        diametro: 0,
        tipo_prisma: null,
        idTipoInstrumento: 28,
      },
      {
        nombre: "Binocular",
        descripcion: "Binocular astronomico",
        apertura: null,
        distancia_focal: null,
        tipo_telescopio: "Refractores",
        aumento: 100,
        diametro: 100,
        tipo_prisma: "Compactos",
        idTipoInstrumento: 29,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Instrumentos", null, {});
  },
};
