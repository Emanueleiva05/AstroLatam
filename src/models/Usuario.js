import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/conexion.js";
import bcrypt from "bcrypt";
import Instrumento from "./Instrumento.js";
import Ciudad from "./Ciudad.js";
import Adjunto from "./Adjunto.js";

class Usuario extends Model {}

Usuario.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      defaultValue: "No hay descripcion",
    },
    numero: {
      type: DataTypes.STRING,
      defaultValue: "No hay numero de contacto",
    },
    idAdjunto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Adjunto,
        key: "idAdjunto",
      },
    },
    idCiudad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ciudad,
        key: "idCiudad",
      },
    },
  },
  {
    sequelize,
    tableName: "Usuarios",
    modelName: "Usuario",
  }
);

export default Usuario;
