"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AccionUsuarios", [
      {
        tipo: "like",
        contenido: null,
        estado: "aceptada",
        targetType: "publicacion",
        targetId: 1,
        fecha: new Date("2025-10-10T23:00:00Z"),
        idUsuario: 1, // FK a tabla Usuarios
      },
      {
        tipo: "comentario",
        contenido:
          "Impresionante evento, el cielo estuvo despejado toda la noche.",
        estado: "aceptada",
        targetType: "observacion",
        targetId: 2,
        fecha: new Date("2025-10-12T01:30:00Z"),
        idUsuario: 2,
      },
      {
        tipo: "reporte",
        contenido:
          "Esta observación contiene datos erróneos de magnitud estelar.",
        estado: "en_revision",
        targetType: "observacion",
        targetId: 3,
        fecha: new Date("2025-10-14T03:15:00Z"),
        idUsuario: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AccionUsuarios", null, {});
  },
};
