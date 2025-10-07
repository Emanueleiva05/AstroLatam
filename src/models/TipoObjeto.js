import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";

class TipoObjeto extends Model {}

TipoObjeto.init(
  {
    idTipoObjeto: {
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
    modelName: "TipoObjeto",
    tableName: "TipoObjetos",
    timestamps: false,
  }
);

export default TipoObjeto;
