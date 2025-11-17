import { Router } from "express";
import {
  createObservationConditionHandler,
  updateObservationConditionHandler,
  deleteObservationConditionHandler,
  getObservationConditionsHandler,
  getObservationConditionHan,
} from "../controllers/ObservacionCondicionController.js";
import {
  findObservationCondition,
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
} from "../middlewares/ObservacionCondicionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
  createObservationConditionHandler
);

router.put(
  "/:id",
  findObservationCondition,
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
  updateObservationConditionHandler
);

router.delete(
  "/:id",
  findObservationCondition,
  deleteObservationConditionHandler
);

router.get("/", validarPageSize, getObservationConditionsHandler);

router.get("/:id", findObservationCondition, getObservationConditionHan);

export default router;

/**
 * @swagger
 * tags:
 *   name: ObservacionCondicion
 *   description: Manejo de condiciones climáticas asociadas a observaciones
 */

/**
 * @swagger
 * /observacionCondicion:
 *   post:
 *     summary: Crear condición para una observación
 *     tags: [ObservacionCondicion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idObservacion
 *               - idTipoCondicion
 *               - valor
 *             properties:
 *               idObservacion:
 *                 type: integer
 *               idTipoCondicion:
 *                 type: integer
 *               valor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Condición creada
 */

/**
 * @swagger
 * /observacionCondicion/{id}:
 *   put:
 *     summary: Actualizar una condición climática
 *     tags: [ObservacionCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Condición actualizada
 */

/**
 * @swagger
 * /observacionCondicion/{id}:
 *   delete:
 *     summary: Eliminar condición climática
 *     tags: [ObservacionCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminada con éxito
 */

/**
 * @swagger
 * /observacionCondicion:
 *   get:
 *     summary: Listar condiciones con paginación
 *     tags: [ObservacionCondicion]
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
 *         description: Lista paginada
 */

/**
 * @swagger
 * /observacionCondicion/{id}:
 *   get:
 *     summary: Obtener condición por ID
 *     tags: [ObservacionCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Condición encontrada
 */
