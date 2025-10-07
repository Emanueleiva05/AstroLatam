import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DBI_USER,
  process.env.MYSQL_PWD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

async function testConexion() {
  try {
    await sequelize.authenticate();
    console.log("La conexion de la BD fue exitosa");
  } catch (err) {
    console.log("Hubo un error a la hora de conectarse con la BD");
  }
}

testConexion();

export default sequelize;
