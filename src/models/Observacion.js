import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import Ubicacion from "./Ubicacion.js";
import Objeto from "./Objeto.js";
import Adjunto from "./Adjunto.js";
import Evento from "./Evento.js";
import Instrumento from "./Instrumento.js";

class Observacion extends Model {}

Observacion.init(
  {
    idObservacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    horaObservacion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fechaObservacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idUbicacion: {
      type: DataTypes.INTEGER,
      references: {
        model: Ubicacion,
        key: "idUbicacion",
      },
    },
  },
  { sequelize, tableName: "Observaciones", modelName: "Observacion" }
);

Observacion.belongsTo(Ubicacion, { foreignKey: "idUbicacion" });
Ubicacion.hasMany(Observacion, { foreignKey: "idUbicacion" });

Observacion.belongsToMany(Objeto, { through: "ObjetoObservacion" });

Observacion.belongsToMany(Adjunto, { through: "ObservacionAdjunto" });

Observacion.belongsToMany(Evento, { through: "ObservacionEvento" });

Observacion.belongsToMany(Instrumento, { through: "ObservacionInstrumento" });

export default Observacion;
