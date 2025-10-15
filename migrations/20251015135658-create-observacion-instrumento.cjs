"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObservacionInstrumento", {
      idInstrumento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Instrumentos",
          key: "idInstrumento",
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
    await queryInterface.addConstraint("ObservacionInstrumento", {
      fields: ["idInstrumento", "idObservacion"],
      type: "primary key",
      name: "pk_observacion_instrumento",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObservacionInstrumento");
  },
};
