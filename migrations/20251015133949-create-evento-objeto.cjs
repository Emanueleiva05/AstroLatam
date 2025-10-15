"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventoObjeto", {
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
    await queryInterface.addConstraint("EventoObjeto", {
      fields: ["idEvento", "idObjeto"],
      type: "primary key",
      name: "pk_evento_objeto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventoObjeto");
  },
};
