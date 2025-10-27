import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import Ubicacion from "./Ubicacion.js";

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
    visibilidad: {
      type: DataTypes.ENUM("privada", "miembros", "publica"),
      defaultValue: "publica",
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
      allowNull: false,
      references: {
        model: Ubicacion,
        key: "idUbicacion",
      },
    },
    idUbicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ubicacion,
        key: "idUbicacion",
      },
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "idUsuario",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "Observaciones",
    modelName: "Observacion",
  }
);

export default Observacion;
