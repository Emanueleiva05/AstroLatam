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
      references: {
        model: TipoPublicacion,
        key: "idTipoPublicacion",
      },
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "idUsuario",
      },
    },
  },
  { sequelize, tableName: "Publicaciones", modelName: "Publicacion" }
);

Publicacion.belongsTo(TipoPublicacion, { foreignKey: "idTipoPublicacion" });
TipoPublicacion.hasMany(Publicacion, { foreignKey: "idTipoPublicacion" });

Publicacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(Publicacion, { foreignKey: "idUsuario" });

export default Publicacion;
