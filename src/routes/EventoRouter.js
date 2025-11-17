import { Router } from "express";
import {
  createEventHandler,
  deleteEventHandler,
  updateEventHandler,
  getEventsHandler,
  getEventHandler,
  addAttachmentHandler,
  removeAttachmentHandler,
  addObjectHandler,
  removeObjectHandler,
  addCountryHandler,
  removeCountryHandler,
  getAttachmentHandler,
  getAttachmentsHandler,
  getCountriesHandler,
  getCountryHandler,
  getObjectsHandler,
  getObjectHandler,
} from "../controllers/EventoController.js";
import {
  findEvent,
  findAttachment,
  validateEventData,
  validateEventTypeExists,
  findObject,
  findCountry,
  findEventAttachment,
  findEventCountry,
  findEventObject,
} from "../middlewares/EventoMiddleware.js";
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
  validateEventData,
  validateEventTypeExists,
  createEventHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  validateEventData,
  validateEventTypeExists,
  updateEventHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  deleteEventHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getEventsHandler);

router.get("/:id", verifyOptionalToken, findEvent, getEventHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  addAttachmentHandler
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  removeAttachmentHandler
);

router.post(
  "/:id/paises/:idPais",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  addCountryHandler
);

router.delete(
  "/:id/paises/:idPais",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  removeCountryHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findObject,
  addObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findEvent,
  findObject,
  removeObjectHandler
);

router.get(
  "/:id/adjuntos",
  verifyOptionalToken,
  findEvent,
  getAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verifyOptionalToken,
  findEvent,
  findEventAttachment,
  getAttachmentHandler
);

router.get("/:id/paises", verifyOptionalToken, findEvent, getCountriesHandler);

router.get(
  "/:id/paises/:idPais",
  verifyOptionalToken,
  findEvent,
  findEventCountry,
  getCountryHandler
);

router.get("/:id/objetos", verifyOptionalToken, findEvent, getObjectsHandler);

router.get(
  "/:id/objetos/:idObjeto",
  verifyOptionalToken,
  findEvent,
  findEventObject,
  getObjectHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Evento
 *   description: Gestión de eventos astronómicos y sus relaciones
 */

/**
 * @swagger
 * /evento:
 *   post:
 *     summary: Crear un evento astronómico
 *     description: Solo puede hacerlo un usuario con rol administrador.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - horaInicio
 *               - horaFin
 *               - fechaInicio
 *               - fechaFin
 *               - idTipoEvento
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               horaInicio:
 *                 type: string
 *                 example: "20:30:00"
 *               horaFin:
 *                 type: string
 *                 example: "23:00:00"
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *               idTipoEvento:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Evento creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /evento/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     description: Solo administrador puede actualizar eventos.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
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
 *               horaInicio:
 *                 type: string
 *               horaFin:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *               idTipoEvento:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /evento/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     description: Solo administrador.
 *     tags: [Evento]
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
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /evento:
 *   get:
 *     summary: Listar eventos (paginado)
 *     tags: [Evento]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 0
 *       - name: size
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista paginada de eventos
 */

/**
 * @swagger
 * /evento/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /evento/{id}/adjuntos/{idAdjunto}:
 *   post:
 *     summary: Asociar un adjunto a un evento
 *     description: Solo administrador puede asociar adjuntos.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idAdjunto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Adjunto asociado al evento
 *       404:
 *         description: Evento o adjunto no encontrado
 */

/**
 * @swagger
 * /evento/{id}/adjuntos/{idAdjunto}:
 *   delete:
 *     summary: Desasociar un adjunto de un evento
 *     description: Solo administrador.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idAdjunto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto removido del evento
 */

/**
 * @swagger
 * /evento/{id}/paises/{idPais}:
 *   post:
 *     summary: Asociar un país a un evento
 *     description: Indica en qué países es visible/relevante el evento.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idPais
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: País asociado al evento
 */

/**
 * @swagger
 * /evento/{id}/paises/{idPais}:
 *   delete:
 *     summary: Desasociar un país de un evento
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idPais
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País removido del evento
 */

/**
 * @swagger
 * /evento/{id}/objetos/{idObjeto}:
 *   post:
 *     summary: Asociar un objeto astronómico a un evento
 *     description: Ej. “Eclipse visible sobre Júpiter”, etc.
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idObjeto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Objeto asociado al evento
 */

/**
 * @swagger
 * /evento/{id}/objetos/{idObjeto}:
 *   delete:
 *     summary: Desasociar un objeto astronómico de un evento
 *     tags: [Evento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idObjeto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto removido del evento
 */

/**
 * @swagger
 * /evento/{id}/adjuntos:
 *   get:
 *     summary: Obtener todos los adjuntos de un evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de adjuntos del evento
 */

/**
 * @swagger
 * /evento/{id}/adjuntos/{idAdjunto}:
 *   get:
 *     summary: Obtener un adjunto específico asociado al evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idAdjunto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto encontrado
 */

/**
 * @swagger
 * /evento/{id}/paises:
 *   get:
 *     summary: Obtener países asociados a un evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de países del evento
 */

/**
 * @swagger
 * /evento/{id}/paises/{idPais}:
 *   get:
 *     summary: Obtener datos de un país específico asociado al evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idPais
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País asociado encontrado
 */

/**
 * @swagger
 * /evento/{id}/objetos:
 *   get:
 *     summary: Obtener objetos astronómicos asociados a un evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de objetos asociados al evento
 */

/**
 * @swagger
 * /evento/{id}/objetos/{idObjeto}:
 *   get:
 *     summary: Obtener un objeto astronómico específico asociado al evento
 *     tags: [Evento]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: idObjeto
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto asociado encontrado
 */
