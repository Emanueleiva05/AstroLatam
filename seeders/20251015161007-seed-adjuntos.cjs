"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Adjuntos", [
      {
        link_archivo: "URL/Imagen.png",
        descripcion: "Imagen de algo",
        idTipoAdjunto: 31,
      },
      {
        link_archivo: "URL/Video.mp4",
        descripcion: "Video de algo",
        idTipoAdjunto: 33,
      },
      {
        link_archivo: "URL/Archivo.pdf",
        descripcion: "Archivo de algo",
        idTipoAdjunto: 32,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Adjuntos", null, {});
  },
};
