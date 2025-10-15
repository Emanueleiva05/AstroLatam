"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Publicaciones", [
      {
        titulo: "La Luna Roja de Octubre",
        descripcion:
          "Análisis y fotos del eclipse lunar observado desde Buenos Aires. Se pudo apreciar el tono rojizo característico.",
        fechaPublicacion: new Date("2025-10-10T02:30:00Z"),
        idTipoPublicacion: 76, // Ej: tipo 'Astronómica'
        idUsuario: 1, // Usuario existente
      },
      {
        titulo: "Captura de la Nebulosa de Orión",
        descripcion:
          "Tomada con un telescopio Newtoniano 150/750. Se procesó la imagen con PixInsight.",
        fechaPublicacion: new Date("2025-09-21T04:15:00Z"),
        idTipoPublicacion: 77, // Ej: tipo 'Fotografía'
        idUsuario: 2,
      },
      {
        titulo: "Guía de observación para principiantes",
        descripcion:
          "Consejos básicos para iniciarse en la astronomía: equipo, app de mapas estelares y horarios ideales.",
        fechaPublicacion: new Date("2025-08-05T20:00:00Z"),
        idTipoPublicacion: 78, // Ej: tipo 'Educativa'
        idUsuario: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Publicaciones", null, {});
  },
};
