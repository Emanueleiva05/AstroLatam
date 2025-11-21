"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Usuarios", {
      idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        defaultValue: "No hay descripcion",
      },
      numero: {
        type: Sequelize.STRING,
        defaultValue: "No hay numero de contacto",
      },
      rol: {
        type: Sequelize.ENUM(
          "administrador",
          "moderador",
          "astronomo",
          "aficionado"
        ),
        allowNull: false,
      },
      idAdjunto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Adjuntos",
          key: "idAdjunto",
        },
      },
      idCiudad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Ciudades",
          key: "idCiudad",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuarios");
  },
};
