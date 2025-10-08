import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";
import TipoEvento from "./TipoEvento.js";
import Pais from "./Pais.js";
import Objeto from "./Objeto.js";
import Adjunto from "./Adjunto.js";
import Observacion from "./Observacion.js";

class Evento extends Model {}

Evento.init(
  {
    idEvento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idTipoEvento: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoEvento,
        key: "idTipoEvento",
      },
    },
  },
  {
    sequelize,
    modelName: "Evento",
    tableName: "Eventos",
    timestamps: false,
  }
);

Evento.belongsTo(TipoEvento, { foreignKey: "idTipoEvento" });
TipoEvento.hasMany(Evento, { foreignKey: "idTipoEvento" });

Evento.belongsToMany(Pais, { through: "EventoPais" });

Evento.belongsToMany(Objeto, { through: "EventoObjeto" });

Evento.belongsToMany(Adjunto, { through: "EventoAdjunto" });

Evento.belongsToMany(Observacion, { through: "ObservacionEvento" });

export default Evento;
