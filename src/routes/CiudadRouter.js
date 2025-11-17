import { Router } from "express";
import {
  createCityHandler,
  updateCityHandler,
  deleteCityHandler,
  getCityHandler,
  getCitiesHandler,
} from "../controllers/CiudadController.js";
import {
  validateCityData,
  validateProvinceExists,
  findCity,
} from "../middlewares/CiudadMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  validateCityData,
  validateProvinceExists,
  createCityHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findCity,
  tieneRol("administrador"),
  validateCityData,
  validateProvinceExists,
  updateCityHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findCity,
  tieneRol("administrador"),
  deleteCityHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getCitiesHandler);

router.get("/:id", verifyOptionalToken, findCity, getCityHandler);

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *   Ciudad:
 *    type: object
 *    properties:
 *      idCiudad:
 *        type: integer
 *        example: 550
 *      nombre:
 *       type: string
 *       example: "La Plata"
 *      idProvincia:
 *       type: integer
 *       example: 10
 *  required:
 *    - nombre
 *    - idProvincia
 */

/**
 * @swagger
 * tags:
 *   - name: Ciudad
 *     description: Gestión de ciudades
 */

/**
 * @swagger
 * /ciudad:
 *   get:
 *     summary: Listar ciudades
 *     tags: [Ciudad]
 */

/**
 * @swagger
 * /ciudad/{id}:
 *   get:
 *     summary: Obtener ciudad por ID
 *     tags: [Ciudad]
 */

/**
 * @swagger
 * /ciudad:
 *   post:
 *     summary: Crear ciudad
 *     tags: [Ciudad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               idProvincia:
 *                 type: integer
 */

/**
 * @swagger
 * /ciudad/{id}:
 *   put:
 *     summary: Actualizar ciudad
 *     tags: [Ciudad]
 */

/**
 * @swagger
 * /ciudad/{id}:
 *   delete:
 *     summary: Eliminar ciudad
 *     tags: [Ciudad]
 */
