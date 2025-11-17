import { Router } from "express";
import {
  createUserActionHandler,
  updateUserActionHandler,
  deleteUserActionHandler,
  getUserActionsHandler,
  getUserActionHandler,
  updateReportStatusHandler,
  getOpenReportsHandler,
  countContentReportsHandler,
  hideReportedContentHandler,
} from "../controllers/AccionUsuarioController.js";
import {
  validateUserActionData,
  validateUserExists,
  findUserAction,
  validateTargetExists,
  validateReportStatus,
  validateContentRequired,
} from "../middlewares/AccionUsuarioMiddleware.js";
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
  validateUserActionData,
  validateContentRequired,
  validateTargetExists,
  validateUserExists,
  createUserActionHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findUserAction,
  validateUserActionData,
  validateContentRequired,
  validateUserExists,
  updateUserActionHandler
);

router.post(
  "/:id/estado",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  validateReportStatus,
  updateReportStatusHandler
);

router.put(
  "/visible/:targetType/:targetId",
  verifyRequiredToken,
  tieneRol("administrador"),
  hideReportedContentHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  deleteUserActionHandler
);

router.get(
  "/reportes",
  tieneRol("administrador"),
  verifyRequiredToken,
  getOpenReportsHandler
);

router.get(
  "/reportes/:targetType",
  verifyRequiredToken,
  tieneRol("administrador", "moderador"),
  countContentReportsHandler
);

router.get(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validarPageSize,
  getUserActionsHandler
);

router.get(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  getUserActionHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: AccionUsuario
 *   description: Comentarios, reacciones y reportes sobre contenido
 */

/**
 * @swagger
 * /accionUsuario:
 *   post:
 *     summary: Crear una acción de usuario (comentario, reacción o reporte)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - targetType
 *               - targetId
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [comentario, reaccion, reporte]
 *               targetType:
 *                 type: string
 *                 enum: [publicacion, observacion, objeto]
 *               targetId:
 *                 type: integer
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Acción creada
 */

/**
 * @swagger
 * /accionUsuario/{id}:
 *   put:
 *     summary: Actualizar acción de usuario propia (excepto reportes)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Acción actualizada
 */

/**
 * @swagger
 * /accionUsuario/{id}:
 *   delete:
 *     summary: Eliminar acción (solo administrador)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       200:
 *         description: Acción eliminada
 */

/**
 * @swagger
 * /accionUsuario:
 *   get:
 *     summary: Listar acciones con paginación (solo admin)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *       - name: size
 *         in: query
 *     responses:
 *       200:
 *         description: Lista paginada
 */

/**
 * @swagger
 * /accionUsuario/{id}:
 *   get:
 *     summary: Obtener una acción específica
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       200:
 *         description: Acción encontrada
 */

/**
 * @swagger
 * /accionUsuario/{id}/estado:
 *   post:
 *     summary: Cambiar estado de un reporte (solo admin)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [enviada, en_revision, rechazada, aceptada]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */

/**
 * @swagger
 * /accionUsuario/reportes:
 *   get:
 *     summary: Listar reportes abiertos (solo admin)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reportes
 */

/**
 * @swagger
 * /accionUsuario/reportes/{targetType}:
 *   get:
 *     summary: Contar reportes por contenido específico
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: targetType
 *         in: path
 *         schema:
 *           type: string
 *           enum: [publicacion, observacion, objeto]
 *     responses:
 *       200:
 *         description: Cantidad de reportes agrupados
 */

/**
 * @swagger
 * /accionUsuario/visible/{targetType}/{targetId}:
 *   put:
 *     summary: Ocultar o mostrar contenido reportado (solo admin)
 *     tags: [AccionUsuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: targetType
 *         in: path
 *         schema:
 *           type: string
 *       - name: targetId
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visibilidad actualizada
 */
