import { Router } from "express";
import {
  createProvinceHandler,
  updateProvinceHandler,
  deleteProvinceHandler,
  getProvinceHandler,
  getProvincesHandler,
} from "../controllers/ProvinciaController.js";

import {
  findProvince,
  validateProvinceData,
  validateCountryExists,
} from "../middlewares/ProvinciaMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateProvinceData,
  validateCountryExists,
  createProvinceHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findProvince,
  tieneRol("administrador"),
  validateProvinceData,
  validateCountryExists,
  updateProvinceHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findProvince,
  tieneRol("administrador"),
  deleteProvinceHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getProvincesHandler);

router.get("/:id", verifyOptionalToken, findProvince, getProvinceHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Provincia
 *   description: Gestión de provincias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Provincia:
 *       type: object
 *       properties:
 *         idProvincia:
 *           type: integer
 *           example: 10
 *         nombre:
 *           type: string
 *           example: "Buenos Aires"
 *         idPais:
 *           type: integer
 *           example: 1
 *       required:
 *         - nombre
 *         - idPais
 */

/**
 * @swagger
 * /provincia:
 *   get:
 *     summary: Listar todas las provincias
 *     tags: [Provincia]
 *     responses:
 *       200:
 *         description: Lista de provincias
 */

/**
 * @swagger
 * /provincia/{id}:
 *   get:
 *     summary: Obtener una provincia por ID
 *     tags: [Provincia]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 */

/**
 * @swagger
 * /provincia:
 *   post:
 *     summary: Crear provincia
 *     tags: [Provincia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               idPais:
 *                 type: integer
 */

/**
 * @swagger
 * /provincia/{id}:
 *   put:
 *     summary: Actualizar provincia
 *     tags: [Provincia]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 */

/**
 * @swagger
 * /provincia/{id}:
 *   delete:
 *     summary: Eliminar provincia
 *     tags: [Provincia]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 */
