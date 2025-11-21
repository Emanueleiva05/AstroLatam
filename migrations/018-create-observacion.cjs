"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Observaciones", {
      idObservacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      visibilidad: {
        type: Sequelize.ENUM("privada", "miembros", "publica"),
        defaultValue: "publica",
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      horaObservacion: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      fechaObservacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idUbicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Ubicaciones",
          key: "idUbicacion",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Observaciones");
  },
};
