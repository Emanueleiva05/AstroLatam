import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";

class TipoAdjunto extends Model {}

TipoAdjunto.init(
  {
    idTipoAdjunto: {
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
    modelName: "TipoAdjunto",
    tableName: "TipoAdjuntos",
    timestamps: false,
  }
);
