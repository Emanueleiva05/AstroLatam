import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";

class TipoInstrumento extends Model {}

TipoInstrumento.init(
  {
    idTipoInstrumento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TipoInstrumento",
    tableName: "TipoInstrumentos",
    timestamps: false,
  }
);

export default TipoInstrumento;
