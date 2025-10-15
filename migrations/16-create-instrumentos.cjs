"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Instrumentos", {
      idInstrumento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      apertura: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      distancia_focal: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      tipo_telescopio: {
        type: Sequelize.ENUM("Refractores", "Reflectores", "Catadioptricos"),
        allowNull: true,
      },
      aumento: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      diametro: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tipo_prisma: {
        type: Sequelize.ENUM("Universales", "Gran formato", "Compactos"),
        allowNull: true,
      },
      idTipoInstrumento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TipoInstrumentos",
          key: "idTipoInstrumento",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Instrumentos");
  },
};
