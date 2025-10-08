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
    modelName: "AccionUsuario",
    tableName: "AccionUsuarios",
  }
);

export default AccionUsuario;
