import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoEvento from "./TipoEvento.js";

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

export default Evento;
