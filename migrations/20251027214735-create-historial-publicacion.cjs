"use strict";

const { now } = require("sequelize/lib/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HistorialPublicaciones", {
      idHistorial: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idPublicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fechaPublicacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaModificacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      idTipoPublicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoPublicaciones",
          key: "idTipoPublicacion",
        },
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "idUsuario",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("HistorialPublicaciones");
  },
};
