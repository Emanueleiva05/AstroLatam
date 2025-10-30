"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex("Usuarios", { fields: ["username"] });
    await queryInterface.addIndex("AccionUsuarios", {
      fields: ["tipo", "estado", "targetType"],
    });
    await queryInterface.addIndex("Publicaciones", {
      fields: ["visibilidad"],
    });
    await queryInterface.addIndex("Observaciones", {
      fields: ["visibilidad"],
    });
    await queryInterface.addIndex("Ciudades", {
      fields: ["nombre"],
    });
    await queryInterface.addIndex("Provincias", {
      fields: ["nombre"],
    });
    await queryInterface.addIndex("Paises", {
      fields: ["nombre"],
    });
    await queryInterface.addIndex("Instrumentos", {
      fields: ["nombre"],
    });
    await queryInterface.addIndex("Objetos", {
      fields: ["nombre"],
    });
    await queryInterface.addIndex("Eventos", {
      fields: ["nombre"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Usuarios", ["username"]);
    await queryInterface.removeIndex("AccionUsuarios", [
      "tipo",
      "estado",
      "targetType",
    ]);
    await queryInterface.removeIndex("Publicaciones", ["visibilidad"]);
    await queryInterface.removeIndex("Observaciones", ["visibilidad"]);
    await queryInterface.removeIndex("Ubicaciones", ["nombre"]);
    await queryInterface.removeIndex("Ciudades", ["nombre"]);
    await queryInterface.removeIndex("Provincias", ["nombre"]);
    await queryInterface.removeIndex("Paises", ["nombre"]);
    await queryInterface.removeIndex("Instrumentos", ["nombre"]);
    await queryInterface.removeIndex("Objetos", ["nombre"]);
    await queryInterface.removeIndex("Eventos", ["nombre"]);
  },
};
