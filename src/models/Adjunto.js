import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";
import TipoAdjunto from "./TipoAdjunto.js";
import Objeto from "./Objeto.js";
import Evento from "./Evento.js";
import Observacion from "./Observacion.js";

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

Adjunto.belongsTo(TipoAdjunto, { foreignKey: "idTipoAdjunto" });
TipoAdjunto.hasMany(Adjunto, { foreignKey: "idTipoAdjunto" });

Adjunto.belongsToMany(Evento, { through: "EventoAdjunto" });

Adjunto.belongsToMany(Objeto, { through: "ObjetoAdjunto" });

Adjunto.belongsToMany(Observacion, { through: "ObservacionAdjunto" });

export default Adjunto;
