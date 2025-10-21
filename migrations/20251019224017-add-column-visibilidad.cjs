"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Publicaciones", "visibilidad", {
      type: Sequelize.ENUM("privada", "miembros", "publica"),
      defaultValue: "publica",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Publicaciones", "visibilidad");
  },
};
