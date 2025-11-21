"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InstrumentoUsuario", {
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
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "idUsuario",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addConstraint("InstrumentoUsuario", {
      fields: ["idInstrumento", "idUsuario"],
      type: "primary key",
      name: "pk_instrumento_usuario",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("InstrumentoUsuario");
  },
};
