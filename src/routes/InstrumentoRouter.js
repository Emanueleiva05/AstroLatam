import { Router } from "express";
import {
  createInstrumentHandler,
  updateInstrumentHandler,
  deleteInstrumentHandler,
  getInstrumentsHandler,
  getInstrumentHandler,
} from "../controllers/InstrumentoController.js";
import {
  validateInstrumentData,
  validateInstrumentTypeExists,
  findInstrument,
} from "../middlewares/InstrumentoMiddleware.js";
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
  validateInstrumentData,
  validateInstrumentTypeExists,
  createInstrumentHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  validateInstrumentData,
  validateInstrumentTypeExists,
  findInstrument,
  tieneRol("administrador"),
  updateInstrumentHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findInstrument,
  tieneRol("administrador"),
  deleteInstrumentHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getInstrumentsHandler);

router.get("/:id", verifyOptionalToken, findInstrument, getInstrumentHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Instrumento
 *   description: Gestión de instrumentos astronómicos
 */

/**
 * @swagger
 * /instrumento:
 *   get:
 *     summary: Obtener lista paginada de instrumentos
 *     tags: [Instrumento]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de instrumentos
 */

/**
 * @swagger
 * /instrumento/{id}:
 *   get:
 *     summary: Obtener instrumento por ID
 *     tags: [Instrumento]
 */

/**
 * @swagger
 * /instrumento:
 *   post:
 *     summary: Crear instrumento (solo admin)
 *     tags: [Instrumento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idTipoInstrumento:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Instrumento creado
 */

/**
 * @swagger
 * /instrumento/{id}:
 *   put:
 *     summary: Modificar instrumento (solo admin)
 *     tags: [Instrumento]
 */

/**
 * @swagger
 * /instrumento/{id}:
 *   delete:
 *     summary: Eliminar instrumento (solo admin)
 *     tags: [Instrumento]
 */
