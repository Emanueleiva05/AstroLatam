import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";
import TipoObjeto from "./TipoObjeto.js";
import Evento from "./Evento.js";
import Adjunto from "./Adjunto.js";
import Observacion from "./Observacion.js";

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
      allowNull: false,
    },
    idTipoObjeto: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoObjeto,
        key: "idTipoObjeto",
      },
    },
  },
  {
    sequelize,
    modelName: "Objeto",
    tableName: "Objetos",
  }
);

Objeto.belongsTo(TipoObjeto, { foreignKey: "idTipoObjeto" });
TipoObjeto.hasMany(Objeto, { foreignKey: "idTipoObjeto" });

Objeto.belongsToMany(Evento, { through: "EventoObjeto" });

Objeto.belongsToMany(Adjunto, { through: "ObjetoAdjunto" });

Objeto.belongsToMany(Observacion, { through: "ObjetoObservacion" });

export default Objeto;
