import { Router } from "express";
import {
  deleteObservationHandler,
  createObservationHandler,
  updateObservationHandler,
  getObservationsHandler,
  getObservationHandler,
  addObservationAttachmentHandler,
  removeObservationAttachmentHandler,
  addObservationEventHandler,
  removeObservationEventHandler,
  addObservationInstrumentHandler,
  removeObservationInstrumentHandler,
  addObservationObjectHandler,
  removeObservationObjectHandler,
  getObservationAttachmentsHandler,
  getObservationAttachmentHandler,
  getObservationEventsHandler,
  getObservationEventHandler,
  getObservationInstrumentsHandler,
  getObservationInstrumentHandler,
  getObservationObjectsHandler,
  getObservationObjectHandler,
  updateObservationVisibilityHandler,
} from "../controllers/ObservacionController.js";
import {
  findObservation,
  validateObservationData,
  validateLocationExists,
  findAttachment,
  findEvent,
  findInstrument,
  findObject,
  findObservationObject,
  findObservationEvent,
  findObservationAttachment,
  findObservationInstrument,
  validateUserExists,
  validateUserInstrument,
} from "../middlewares/ObservacionMiddleware.js";
import { VerificarVisibilidad } from "../utils/GeneralValidation.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  validateObservationData,
  validateLocationExists,
  validateUserExists,
  createObservationHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  validateObservationData,
  validateLocationExists,
  updateObservationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  deleteObservationHandler
);

router.get("/", verifyOptionalToken, getObservationsHandler);

router.get("/:id", verifyOptionalToken, findObservation, getObservationHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findAttachment,
  addObservationAttachmentHandler
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findAttachment,
  removeObservationAttachmentHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findObject,
  addObservationObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findObject,
  removeObservationObjectHandler
);

router.post(
  "/:id/eventos/:idEvento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findEvent,
  addObservationEventHandler
);

router.delete(
  "/:id/eventos/:idEvento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findEvent,
  removeObservationEventHandler
);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findInstrument,
  validateUserInstrument,
  addObservationInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findInstrument,
  removeObservationInstrumentHandler
);

router.get(
  "/:id/objetos",
  verifyOptionalToken,
  findObservation,
  getObservationObjectsHandler
);

router.get(
  "/:id/objetos/:idObjeto",
  verifyOptionalToken,
  findObservation,
  findObservationObject,
  getObservationObjectHandler
);

router.get(
  "/:id/eventos",
  verifyOptionalToken,
  findObservation,
  getObservationEventsHandler
);

router.get(
  "/:id/eventos/:idEvento",
  verifyOptionalToken,
  findObservation,
  findObservationEvent,
  getObservationEventHandler
);

router.get(
  "/:id/adjuntos",
  verifyOptionalToken,
  findObservation,
  getObservationAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verifyOptionalToken,
  findObservation,
  findObservationAttachment,
  getObservationAttachmentHandler
);

router.get(
  "/:id/instrumentos",
  verifyOptionalToken,
  findObservation,
  getObservationInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verifyOptionalToken,
  findObservation,
  findObservationInstrument,
  getObservationInstrumentHandler
);

router.put(
  "/visible/:id",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  VerificarVisibilidad,
  updateObservationVisibilityHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Observacion
 *   description: Gestión de observaciones astronómicas creadas por usuarios
 */

/**
 * @swagger
 * /observacion:
 *   post:
 *     summary: Crear una observación
 *     description: Cualquier usuario autenticado puede crear una observación.
 *     tags: [Observacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - idUbicacion
 *               - idUsuario
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idUbicacion:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Observación creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /observacion/{id}:
 *   put:
 *     summary: Actualizar una observación
 *     description: Solo el dueño de la observación puede actualizarla.
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idUbicacion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Observación actualizada
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Observación no encontrada
 */

/**
 * @swagger
 * /observacion/{id}:
 *   delete:
 *     summary: Eliminar una observación
 *     description: Solo el dueño puede eliminarla.
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Observación eliminada
 *       403:
 *         description: No autorizado
 *       404:
 *         description: No encontrada
 */

/**
 * @swagger
 * /observacion:
 *   get:
 *     summary: Listar observaciones
 *     tags: [Observacion]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema: { type: integer }
 *       - name: size
 *         in: query
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de observaciones
 */

/**
 * @swagger
 * /observacion/{id}:
 *   get:
 *     summary: Obtener una observación por ID
 *     tags: [Observacion]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200:
 *         description: Observación encontrada
 *       404:
 *         description: No encontrada
 */

/* ----------  RELACIÓN: ADJUNTOS  ---------- */

/**
 * @swagger
 * /observacion/{id}/adjuntos/{idAdjunto}:
 *   post:
 *     summary: Agregar un adjunto a una observación
 *     description: Solo el creador de la observación puede agregar adjuntos.
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *       - { in: path, name: idAdjunto, required: true, schema: { type: integer } }
 *     responses:
 *       201:
 *         description: Adjunto agregado
 */

/**
 * @swagger
 * /observacion/{id}/adjuntos/{idAdjunto}:
 *   delete:
 *     summary: Quitar un adjunto de una observación
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *       - { in: path, name: idAdjunto, required: true, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Adjunto removido
 */

/**
 * @swagger
 * /observacion/{id}/adjuntos:
 *   get:
 *     summary: Listar adjuntos de una observación
 *     tags: [Observacion]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Lista de adjuntos
 */

/* ----------  RELACIÓN: OBJETOS ---------- */

/**
 * @swagger
 * /observacion/{id}/objetos/{idObjeto}:
 *   post:
 *     summary: Vincular un objeto astronómico a una observación
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true }
 *       - { in: path, name: idObjeto, required: true }
 *     responses:
 *       201:
 *         description: Objeto agregado
 */

/**
 * @swagger
 * /observacion/{id}/objetos/{idObjeto}:
 *   delete:
 *     summary: Desvincular un objeto de una observación
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true }
 *       - { in: path, name: idObjeto, required: true }
 *     responses:
 *       200:
 *         description: Objeto removido
 */

/**
 * @swagger
 * /observacion/{id}/objetos:
 *   get:
 *     summary: Listar objetos asociados a una observación
 *     tags: [Observacion]
 *     parameters:
 *       - { in: path, name: id, required: true }
 *     responses:
 *       200:
 *         description: Lista de objetos
 */

/* ----------  RELACIÓN: EVENTOS  ---------- */

/**
 * @swagger
 * /observacion/{id}/eventos/{idEvento}:
 *   post:
 *     summary: Asociar un evento astronómico a una observación
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id }
 *       - { in: path, name: idEvento }
 *     responses:
 *       201:
 *         description: Evento asociado
 */

/**
 * @swagger
 * /observacion/{id}/eventos/{idEvento}:
 *   delete:
 *     summary: Remover un evento asociado
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id }
 *       - { in: path, name: idEvento }
 *     responses:
 *       200:
 *         description: Evento removido
 */

/**
 * @swagger
 * /observacion/{id}/eventos:
 *   get:
 *     summary: Listar eventos asociados a una observación
 *     tags: [Observacion]
 *     parameters:
 *       - { in: path, name: id }
 *     responses:
 *       200:
 *         description: Lista de eventos
 */

/* ----------  RELACIÓN: INSTRUMENTOS  ---------- */

/**
 * @swagger
 * /observacion/{id}/instrumentos/{idInstrumento}:
 *   post:
 *     summary: Asociar un instrumento a una observación
 *     description: Solo válido si el usuario dueño posee ese instrumento.
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id }
 *       - { in: path, name: idInstrumento }
 *     responses:
 *       201:
 *         description: Instrumento asociado
 */

/**
 * @swagger
 * /observacion/{id}/instrumentos/{idInstrumento}:
 *   delete:
 *     summary: Remover un instrumento asociado
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id }
 *       - { in: path, name: idInstrumento }
 *     responses:
 *       200:
 *         description: Instrumento removido
 */

/**
 * @swagger
 * /observacion/{id}/instrumentos:
 *   get:
 *     summary: Listar instrumentos asociados a una observación
 *     tags: [Observacion]
 *     parameters:
 *       - { in: path, name: id }
 *     responses:
 *       200:
 *         description: Lista de instrumentos
 */

/* ---------- VISIBILIDAD ---------- */

/**
 * @swagger
 * /observacion/visible/{id}:
 *   put:
 *     summary: Cambiar la visibilidad de una observación
 *     description: Solo dueño.
 *     tags: [Observacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Visibilidad actualizada
 */
