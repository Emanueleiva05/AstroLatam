"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AccionUsuarios", {
      idAccion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: Sequelize.ENUM("like", "comentario", "reporte"),
        allowNull: false,
      },
      contenido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM("enviada", "en_revision", "rechazada", "aceptada"),
        defaultValue: "enviada",
      },
      targetType: {
        type: Sequelize.ENUM("publicacion", "observacion"),
        allowNull: false,
      },
      targetId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "idUsuario",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AccionUsuarios");
  },
};
