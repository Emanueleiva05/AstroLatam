"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ObjetoAdjunto", {
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
    });
    await queryInterface.addConstraint("ObjetoAdjunto", {
      fields: ["idObjeto", "idAdjunto"],
      type: "primary key",
      name: "pk_objeto_adjunto",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ObjetoAdjunto");
  },
};
