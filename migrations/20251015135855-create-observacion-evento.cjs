"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObservacionEvento", {
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
      idEvento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Eventos",
          key: "idEvento",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addConstraint("ObservacionEvento", {
      fields: ["idEvento", "idObservacion"],
      type: "primary key",
      name: "pk_observacion_evento",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObservacionEvento");
  },
};
