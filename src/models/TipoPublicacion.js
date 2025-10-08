import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";

class TipoPublicacion extends Model {}

TipoPublicacion.init(
  {
    idTipoPublicacion: {
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
    modelName: "TipoPublicacion",
    tableName: "TipoPublicaciones",
    timestamps: false,
  }
);

export default TipoPublicacion;
