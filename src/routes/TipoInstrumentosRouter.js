import { Router } from "express";
import {
  createInstrumentTypeHandler,
  deleteInstrumentTypeHandler,
  updateInstrumentTypeHandler,
  getInstrumentTypesHandler,
  getInstrumentTypeHandler,
} from "../controllers/TipoInstrumentoController.js";
import {
  findInstrumentType,
  validateInstrumentTypeData,
} from "../middlewares/TipoInstrumentoMiddleware.js";
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
  tieneRol("administrador"),
  validateInstrumentTypeData,
  createInstrumentTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findInstrumentType,
  validateInstrumentTypeData,
  updateInstrumentTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findInstrumentType,
  deleteInstrumentTypeHandler
);

router.get(
  "/",
  verifyOptionalToken,
  validarPageSize,
  getInstrumentTypesHandler
);

router.get(
  "/:id",
  verifyOptionalToken,
  findInstrumentType,
  getInstrumentTypeHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: TipoInstrumento
 *   description: Gestión de tipos de instrumento
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoInstrumento:
 *       type: object
 *       properties:
 *         idTipoEvento:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Celereon"
 *         descripcion:
 *          type: string
 *          example: "Binoculares astronomicos"
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /tipoInstrumento:
 *   get:
 *     summary: Obtener todos los tipos de instrumentos
 *     tags: [TipoInstrumento]
 *     responses:
 *       200:
 *         description: Lista de tipos de instrumentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoInstrumento"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoInstrumento/{id}:
 *   get:
 *     summary: Obtener un tipo de instrumento por ID
 *     tags: [TipoInstrumento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de instrumento
 *     responses:
 *       200:
 *         description: Tipo de instrumento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoInstrumento"
 *       404:
 *         description: No se encontró el tipo de instrumento
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoInstrumento:
 *   post:
 *     summary: Crear un nuevo tipo de instrumento
 *     tags: [TipoInstrumento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoInstrumento"
 *     responses:
 *       201:
 *         description: Tipo de instrumento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoInstrumento"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoInstrumento/{id}:
 *   put:
 *     summary: Actualizar un tipo de instrumento existente
 *     tags: [TipoInstrumento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de instrumento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoInstrumento"
 *     responses:
 *       200:
 *         description: Tipo de instrumento actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de instrumento
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoInstrumento/{id}:
 *   delete:
 *     summary: Eliminar un tipo de evento
 *     tags: [TipoInstrumento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de instrumento
 *     responses:
 *       200:
 *         description: Tipo de instrumento eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de instrumento
 *       500:
 *         description: Error interno del servidor
 */
