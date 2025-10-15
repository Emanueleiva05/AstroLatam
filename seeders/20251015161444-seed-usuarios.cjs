"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        username: "EmaLeio05",
        nombre: "Emanuel Leiva",
        email: "email@gmail.com",
        password: "12345678",
        descripcion: "Soy una descripcion",
        numero: "11-1111-1111",
        rol: "astronomo",
        idAdjunto: 1,
        idCiudad: 1,
      },
      {
        username: "BrisaLopez21",
        nombre: "Brisa Lopez",
        email: "email2@gmail.com",
        password: "12345678",
        descripcion: "Soy una descripcion",
        numero: "11-1111-1111",
        rol: "moderador",
        idAdjunto: 2,
        idCiudad: 2,
      },
      {
        username: "QuimiCH27",
        nombre: "Quimey chierichini",
        email: "email3@gmail.com",
        password: "12345678",
        descripcion: "Soy una descripcion",
        numero: "11-1111-1111",
        rol: "administrador",
        idAdjunto: 3,
        idCiudad: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
