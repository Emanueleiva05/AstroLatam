"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Eventos", [
      {
        nombre: "Eclipse Lunar Total",
        descripcion:
          "El eclipse lunar podrá verse en gran parte de Sudamérica.",
        horaInicio: "22:30:00",
        horaFin: "23:59:00",
        fechaInicio: new Date("2025-05-15T22:30:00Z"),
        fechaFin: new Date("2025-05-15T23:59:00Z"),
        idTipoEvento: 1, // por ejemplo: "Astronómico"
      },
      {
        nombre: "Lluvia de Meteoros Perseidas",
        descripcion:
          "Uno de los eventos más esperados del año, visible en el hemisferio norte.",
        horaInicio: "02:00:00",
        horaFin: "05:00:00",
        fechaInicio: new Date("2025-08-12T02:00:00Z"),
        fechaFin: new Date("2025-08-12T05:00:00Z"),
        idTipoEvento: 2, // por ejemplo: "Meteoritos"
      },
      {
        nombre: "Conjunción Venus-Júpiter",
        descripcion:
          "Los dos planetas más brillantes visibles juntos en el atardecer.",
        horaInicio: "19:45:00",
        horaFin: "21:00:00",
        fechaInicio: new Date("2025-06-02T19:45:00Z"),
        fechaFin: new Date("2025-06-02T21:00:00Z"),
        idTipoEvento: 3, // por ejemplo: "Conjunción"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Eventos", null, {});
  },
};
