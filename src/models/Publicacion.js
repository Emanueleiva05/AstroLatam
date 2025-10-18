import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoPublicacion from "./TipoPublicacion.js";
import Usuario from "./Usuario.js";

class Publicacion extends Model {}

Publicacion.init(
  {
    idPublicacion: {
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
    fechaPublicacion: {
      type: DataTypes.DATE,
      allowNull: false,
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
    timestamps: false,
    tableName: "Publicaciones",
    modelName: "Publicacion",
  }
);

export default Publicacion;
