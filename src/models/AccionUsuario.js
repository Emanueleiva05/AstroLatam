import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import Usuario from "./Usuario.js";

class AccionUsuario extends Model {}

AccionUsuario.init(
  {
    idAccion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM("like", "comentario", "reporte"),
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("enviada", "en_revision", "rechazada", "aceptada"),
      defaultValue: "enviada",
    },
    targetType: {
      type: DataTypes.ENUM("publicacion", "observacion"),
      allowNull: false,
    },
    targetId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date()),
    },
    nota: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "idUsuario",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "AccionUsuario",
    tableName: "AccionUsuarios",
  }
);

export default AccionUsuario;
