import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoObjeto from "./TipoObjeto.js";

class Objeto extends Model {}

Objeto.init(
  {
    idObjeto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    idTipoObjeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoObjeto,
        key: "idTipoObjeto",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Objeto",
    tableName: "Objetos",
  }
);

export default Objeto;
