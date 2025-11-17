import { Router } from "express";
import {
  createCountryHandler,
  updateCountryHandler,
  deleteCountryHandler,
  getCountryHandler,
  getCountriesHandler,
} from "../controllers/PaisController.js";
import {
  validateCountryData,
  findCountry,
} from "../middlewares/PaisMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post("/", validateCountryData, createCountryHandler);

router.put(
  "/:id",
  verifyRequiredToken,
  findCountry,
  tieneRol("administrador"),
  validateCountryData,
  updateCountryHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findCountry,
  tieneRol("administrador"),
  deleteCountryHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getCountriesHandler);

router.get("/:id", verifyOptionalToken, findCountry, getCountryHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Pais
 *   description: Gestión de paises
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pais:
 *       type: object
 *       properties:
 *         idPais:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Argentina"
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /pais:
 *   get:
 *     summary: Obtener todos los paises
 *     tags: [Pais]
 *     responses:
 *       200:
 *         description: Lista de paises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pais"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pais/{id}:
 *   get:
 *     summary: Obtener un pais por ID
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pais
 *     responses:
 *       200:
 *         description: Pais obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pais"
 *       404:
 *         description: No se encontró el pais
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pais:
 *   post:
 *     summary: Crear un nuevo pais
 *     tags: [Pais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pais"
 *     responses:
 *       201:
 *         description: Pais creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pais"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pais/{id}:
 *   put:
 *     summary: Actualizar un pais existente
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pais"
 *     responses:
 *       200:
 *         description: Pais actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el pais
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /pais/{id}:
 *   delete:
 *     summary: Eliminar un pais
 *     tags: [Pais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pais
 *     responses:
 *       200:
 *         description: Pais eliminado correctamente
 *       404:
 *         description: No se encontró el pais
 *       500:
 *         description: Error interno del servidor
 */
