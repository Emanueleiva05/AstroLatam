"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ubicaciones", [
      {
        latitud: -34.817, // Florencio Varela (Argentina)
        longitud: -58.283,
        tz_original: "America/Argentina/Buenos_Aires",
        timestamp_utc: new Date("2025-10-15T03:00:00Z"),
        geohash: "69y60m4j3",
        idCiudad: 1, // Florencio Varela
      },
      {
        latitud: 35.6617, // Shibuya (Japón)
        longitud: 139.7041,
        tz_original: "Asia/Tokyo",
        timestamp_utc: new Date("2025-10-15T12:00:00Z"),
        geohash: "xn76urxk9",
        idCiudad: 3, // Shibuya
      },
      {
        latitud: 40.7831, // Manhattan (EEUU)
        longitud: -73.9712,
        tz_original: "America/New_York",
        timestamp_utc: new Date("2025-10-15T07:00:00Z"),
        geohash: "dr5regw3q",
        idCiudad: 2, // Manhattan
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ubicaciones", null, {});
  },
};
