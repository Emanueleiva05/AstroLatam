import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";

class TipoCondicion extends Model {}

TipoCondicion.init(
  {
    idTipoCondicion: {
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
    modelName: "TipoCondicion",
    tableName: "TipoCondiciones",
    timestamps: false,
  }
);

export default TipoCondicion;
