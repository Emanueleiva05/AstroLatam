"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventoPais", {
      idEvento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Eventos",
          key: "idEvento",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idPais: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Paises",
          key: "idPais",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addConstraint("EventoPais", {
      fields: ["idEvento", "idPais"],
      type: "primary key",
      name: "pk_evento_pais",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventoPais");
  },
};
