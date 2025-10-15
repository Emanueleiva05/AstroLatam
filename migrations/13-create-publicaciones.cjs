"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Publicaciones", {
      idPublicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fechaPublicacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idTipoPublicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoPublicaciones",
          key: "idTipoPublicacion",
        },
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "idUsuario",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Publicaciones");
  },
};
