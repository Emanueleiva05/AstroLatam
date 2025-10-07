import { DataTypes, Model } from "sequelize";
import sequelize from "../settings/conexion.js";
import bcrypt from "bcrypt";

class Usuarios extends Model {}

Usuarios.init(
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
      type: DataTypes.STRING,
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
    tableName: "Usuario",
    modelName: "Usuario",
  }
);

Usuarios.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Usuarios, { foreignKey: "idCiudad" });

Usuarios.belongsTo(Adjunto, { foreignKey: "idAdjunto" });
Adjunto.hasOne(Usuarios, { foreignKey: "idAdjunto" });

export default Usuarios;
