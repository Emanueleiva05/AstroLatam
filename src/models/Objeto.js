import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
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

export default Objeto;
