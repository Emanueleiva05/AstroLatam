"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Adjuntos", {
      idAdjunto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      link_archivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      idTipoAdjunto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoAdjuntos",
          key: "idTipoAdjunto",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Adjuntos");
  },
};
