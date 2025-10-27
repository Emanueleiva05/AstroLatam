import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoPublicacion from "./TipoPublicacion.js";
import Usuario from "./Usuario.js";
import Publicacion from "./Publicacion.js";

export default class HistorialPublicacion extends Model {}

HistorialPublicacion.init(
  {
    idHistorial: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Publicacion,
        key: "idPublicacion",
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fechaPublicacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      autoIncrement: true,
    },
    idTipoPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoPublicacion,
        key: "idTipoPublicacion",
      },
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "idUsuario",
      },
    },
  },
  {
    sequelize,
    tableName: "HistorialPublicaciones",
    modelName: "HistorialPublicacion",
    timestamps: false,
  }
);
