"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObservacionAdjunto", {
      idAdjunto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Adjuntos",
          key: "idAdjunto",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idObservacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Observaciones",
          key: "idObservacion",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint("ObservacionAdjunto", {
      fields: ["idAdjunto", "idObservacion"],
      type: "primary key",
      name: "pk_observacion_adjunto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObservacionAdjunto");
  },
};
