"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Paises", [
      { nombre: "Argentina" },
      { nombre: "Estados unidos" },
      { nombre: "Portugal" },
      { nombre: "Japon" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Paises", null, {});
  },
};
