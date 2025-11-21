"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ObservacionCondiciones", [
      {
        valor: "75%",
        idTipoCondicion: 1, // Ej: 'Humedad'
        idObservacion: 1, // Eclipse Lunar
      },
      {
        valor: "Cielo despejado",
        idTipoCondicion: 2, // Ej: 'Visibilidad'
        idObservacion: 2, // Perseidas
      },
      {
        valor: "10°C",
        idTipoCondicion: 3, // Ej: 'Temperatura'
        idObservacion: 3, // Venus en Shibuya
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ObservacionCondiciones", null, {});
  },
};
