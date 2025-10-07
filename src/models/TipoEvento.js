import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";

class TipoEvento extends Model {}

TipoEvento.init(
  {
    idTipoEvento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "TipoEvento",
    tableName: "TipoEventos",
    timestamps: false,
  }
);

export default TipoEvento;
