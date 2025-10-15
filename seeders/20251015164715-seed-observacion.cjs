"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Observaciones", [
      {
        titulo: "Eclipse Lunar en Buenos Aires",
        visibilidad: "publica",
        descripcion:
          "La Luna adoptó un tono rojizo intenso visible a simple vista. El cielo se mantuvo despejado durante todo el fenómeno.",
        horaObservacion: "22:45:00",
        fechaObservacion: new Date("2025-05-15T22:45:00Z"),
        idUbicacion: 1, // Florencio Varela
      },
      {
        titulo: "Lluvia de Perseidas desde Manhattan",
        visibilidad: "miembros",
        descripcion:
          "Se observaron más de 30 meteoros por hora. Condiciones óptimas y poca contaminación lumínica.",
        horaObservacion: "03:10:00",
        fechaObservacion: new Date("2025-08-12T03:10:00Z"),
        idUbicacion: 3, // Manhattan
      },
      {
        titulo: "Observación de Venus en Shibuya",
        visibilidad: "privada",
        descripcion:
          "Venus visible justo antes del amanecer, magnitud -4.2. Fotografías tomadas con telescopio refractor.",
        horaObservacion: "05:30:00",
        fechaObservacion: new Date("2025-07-02T05:30:00Z"),
        idUbicacion: 2, // Shibuya
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Observaciones", null, {});
  },
};
