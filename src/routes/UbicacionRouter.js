import { Router } from "express";
import {
  createLocationHandler,
  updateLocationHandler,
  deleteLocationHandler,
  getLocationsHandler,
  getLocationHandler,
} from "../controllers/UbicacionController.js";
import {
  findLocation,
  validateLocationData,
  validateCityExists,
} from "../middlewares/UbicacionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateLocationData,
  validateCityExists,
  createLocationHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findLocation,
  verifyUserOwnership,
  validateLocationData,
  validateCityExists,
  updateLocationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  verifyUserOwnership,
  findLocation,
  deleteLocationHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getLocationsHandler);

router.get("/:id", verifyOptionalToken, findLocation, getLocationHandler);

export default router;

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
