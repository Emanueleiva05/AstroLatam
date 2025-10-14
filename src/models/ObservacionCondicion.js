import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoCondicion from "./TipoCondicion.js";
import Observacion from "./Observacion.js";

class ObservacionCondicion extends Model {}

ObservacionCondicion.init(
  {
    idObservacionCondiciones: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idTipoCondicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoCondicion,
        key: "idTipoCondicion",
      },
    },
    idObservacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Observacion,
        key: "idObservacion",
      },
    },
  },
  {
    sequelize,
    modelName: "ObservacionCondicion",
    tableName: "ObservacionCondiciones",
  }
);

export default ObservacionCondicion;
