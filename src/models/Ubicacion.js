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
    timestamps: false,
    modelName: "Ubicacion",
    tableName: "Ubicaciones",
  }
);

Ubicacion.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Ubicacion, { foreignKey: "idCiudad" });

export default Ubicacion;

/**
 * @swagger
 * components:
 *   schemas:
 *     Ubicacion:
 *       type: object
 *       properties:
 *         idUbicacion:
 *           type: integer
 *           example: 123
 *         latitud:
 *           type: number
 *           example: -34.9214
 *         longitud:
 *           type: number
 *           example: -57.9544
 *         tz_original:
 *           type: string
 *           example: "America/Argentina/Buenos_Aires"
 *         timestamp_utc:
 *           type: string
 *           format: date-time
 *           example: "2025-11-17T03:25:00Z"
 *         geohash:
 *           type: string
 *           example: "69y7qcr6p4f0"
 *         idCiudad:
 *           type: integer
 *           example: 550
 *       required:
 *         - latitud
 *         - longitud
 *         - tz_original
 *         - timestamp_utc
 *         - geohash
 *         - idCiudad
 */

/**
 * @swagger
 * tags:
 *   - name: Ubicacion
 *     description: Gestión de ubicaciones
 */

/**
 * @swagger
 * /ubicacion:
 *   get:
 *     summary: Listar ubicaciones
 *     tags: [Ubicacion]
 */

/**
 * @swagger
 * /ubicacion/{id}:
 *   get:
 *     summary: Obtener ubicación por ID
 *     tags: [Ubicacion]
 */

/**
 * @swagger
 * /ubicacion:
 *   post:
 *     summary: Crear ubicación
 *     tags: [Ubicacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitud:
 *                 type: number
 *               longitud:
 *                 type: number
 *               tz_original:
 *                 type: string
 *               timestamp_utc:
 *                 type: string
 *               geohash:
 *                 type: string
 *               idCiudad:
 *                 type: integer
 */

/**
 * @swagger
 * /ubicacion/{id}:
 *   put:
 *     summary: Actualizar ubicación
 *     tags: [Ubicacion]
 */

/**
 * @swagger
 * /ubicacion/{id}:
 *   delete:
 *     summary: Eliminar ubicación
 *     tags: [Ubicacion]
 */
