"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventoAdjunto", {
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
    await queryInterface.addConstraint("EventoAdjunto", {
      fields: ["idEvento", "idAdjunto"],
      type: "primary key",
      name: "pk_evento_adjunto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventoAdjunto");
  },
};
