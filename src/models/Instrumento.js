import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";
import TipoInstrumento from "./TipoInstrumento.js";
import Usuario from "./Usuario.js";

class Instrumento extends Model {}

Instrumento.init(
  {
    idInstrumento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    apertura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    distancia_focal: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tipo_telescopio: {
      type: DataTypes.ENUM("Refractores", "Reflectores", "Catadioptricos"),
      allowNull: true,
    },
    aumento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diametro: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo_prisma: {
      type: DataTypes.ENUM("Universales", "Gran formato", "Compactos"),
      allowNull: true,
    },
    idTipoInstrumento: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoInstrumento,
        key: "idTipoInstrumento",
      },
    },
  },
  { sequelize, modelName: "Instrumento", tableName: "Instrumentos" }
);

TipoInstrumento.hasMany(Instrumento, { foreignKey: "idTipoInstrumento" });
Instrumento.belongsTo(TipoInstrumento, { foreignKey: "idTipoInstrumento" });

Instrumento.belongsToMany(Usuario, { through: "InstrumentoUsuario" });

export default Instrumento;
