"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Objetos", [
      {
        nombre: "Marte",
        descripcion:
          "El cuarto planeta del sistema solar, conocido como el planeta rojo.",
        idTipoObjeto: 29, // Ej: tipo 'Planeta'
      },
      {
        nombre: "Nebulosa de Orión (M42)",
        descripcion:
          "Nebulosa difusa situada en la constelación de Orión, una de las más brillantes visibles a simple vista.",
        idTipoObjeto: 28, // Ej: tipo 'Nebulosa'
      },
      {
        nombre: "Andrómeda (M31)",
        descripcion:
          "La galaxia espiral más cercana a la Vía Láctea, visible incluso sin telescopio en noches despejadas.",
        idTipoObjeto: 30, // Ej: tipo 'Galaxia'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Objetos", null, {});
  },
};
