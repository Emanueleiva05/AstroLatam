"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObjetoObservacion", {
      idObjeto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Objetos",
          key: "idObjeto",
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
    await queryInterface.addConstraint("ObjetoObservacion", {
      fields: ["idObjeto", "idObservacion"],
      type: "primary key",
      name: "pk_objeto_observacion",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObjetoObservacion");
  },
};
