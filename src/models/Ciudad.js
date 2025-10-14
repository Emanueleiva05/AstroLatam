import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import Provincia from "./Provincia.js";

class Ciudad extends Model {}

Ciudad.init(
  {
    idCiudad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPais: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Provincia,
        key: "idProvincia",
      },
    },
  },
  {
    sequelize,
    modelName: "Ciudad",
    tableName: "Ciudades",
  }
);

export default Ciudad;
