import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoAdjunto from "./TipoAdjunto.js";

class Adjunto extends Model {}

Adjunto.init(
  {
    idAdjunto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    idTipoAdjunto: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoAdjunto,
        key: "idTipoAdjunto",
      },
    },
  },
  {
    sequelize,
    modelName: "Adjunto",
    tableName: "Adjuntos",
  }
);

export default Adjunto;
