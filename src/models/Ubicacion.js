import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import Ciudad from "./Ciudad.js";

class Ubicacion extends Model {}

Ubicacion.init(
  {
    idUbicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latitud: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitud: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tz_original: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    timestamp_utc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    geohash: {
      type: DataTypes.STRING(12),
      allowNull: false,
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
    modelName: "Ubicacion",
    tableName: "Ubicaciones",
  }
);

Ubicacion.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Ubicacion, { foreignKey: "idCiudad" });

export default Ubicacion;
