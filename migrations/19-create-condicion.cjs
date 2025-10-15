"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObservacionCondiciones", {
      idObservacionCondiciones: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idTipoCondicion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoCondiciones",
          key: "idTipoCondicion",
        },
      },
      idObservacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Observaciones",
          key: "idObservacion",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObservacionCondiciones");
  },
};
