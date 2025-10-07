import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion.js";

class Instrumentos extends Model {}

Instrumentos.init(
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    apertura: {
        type: DataTypes.FLOAT,
        allowNull: false,

    },
- Distancia focal (Telescopio)
- Tipo de optica (Telescopio)
- Aumento (Binocular)
- Diametro (Binocular)
- Tipo prisma (Binocular)
- IdTipoInstrumento (fk)
  },
  { sequelize, modelName: "Instrumentos", tableName: "Instrumentos" }
);
