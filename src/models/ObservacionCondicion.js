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
      references: {
        model: TipoCondicion,
        key: "idTipoCondicion",
      },
    },
    idObservacion: {
      type: DataTypes.INTEGER,
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

ObservacionCondicion.belongsTo(Observacion, { foreignKey: "idObservacion" });
Observacion.hasMany(ObservacionCondicion, { foreignKey: "idObservacion" });

ObservacionCondicion.belongsTo(TipoCondicion, {
  foreignKey: "idTipoCondicion",
});
TipoCondicion.hasMany(ObservacionCondicion, { foreignKey: "idTipoCondicion" });

export default ObservacionCondicion;
