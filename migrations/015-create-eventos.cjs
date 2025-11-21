"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Eventos", {
      idEvento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      horaInicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horaFin: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaFin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idTipoEvento: {
        type: Sequelize.INTEGER,
        references: {
          model: "TipoEventos",
          key: "idTipoEvento",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Eventos");
  },
};
