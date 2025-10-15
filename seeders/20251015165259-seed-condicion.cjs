"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ObservacionCondiciones", [
      {
        valor: "75%",
        idTipoCondicion: 25, // Ej: 'Humedad'
        idObservacion: 1, // Eclipse Lunar
      },
      {
        valor: "Cielo despejado",
        idTipoCondicion: 26, // Ej: 'Visibilidad'
        idObservacion: 2, // Perseidas
      },
      {
        valor: "10°C",
        idTipoCondicion: 27, // Ej: 'Temperatura'
        idObservacion: 3, // Venus en Shibuya
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ObservacionCondiciones", null, {});
  },
};
