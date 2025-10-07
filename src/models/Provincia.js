import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";
import Pais from "./Pais.js";

class Provincia extends Model {}

Provincia.init(
  {
    idProvincia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPais: {
      type: DataTypes.INTEGER,
      references: {
        model: Pais,
        key: "idPais",
      },
    },
  },
  {
    sequelize,
    modelName: "Provincia",
    tableName: "Provincias",
  }
);

Provincia.belongsTo(Pais, { foreignKey: "idPais" });
Pais.hasMany(Provincia, { foreignKey: "idPais" });

export default Provincia;
