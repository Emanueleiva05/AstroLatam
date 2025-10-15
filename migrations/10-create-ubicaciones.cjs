"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ubicaciones", {
      idUbicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      latitud: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tz_original: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      timestamp_utc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      geohash: {
        type: Sequelize.STRING(12),
        allowNull: false,
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
    await queryInterface.dropTable("Ubicaciones");
  },
};
