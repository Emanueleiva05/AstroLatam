import { Model, DataTypes } from "sequelize";
import sequelize from "../settings/conexion";
import Evento from "./Evento.js";

class Pais extends Model {}

Pais.init(
  {
    idPais: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Pais",
    tableName: "Paises",
  }
);

Pais.belongsToMany(Evento, { through: "EventoPais" });

export default Pais;
