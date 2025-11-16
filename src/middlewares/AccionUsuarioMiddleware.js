import AppError from "../utils/AppError.js";
import { getUserActionById } from "../service/AccionUsuarioService.js";
import { getUserById } from "../service/UsuarioService.js";
import { getPublicationById } from "../service/PublicacionService.js";
import { getObservationById } from "../service/ObservacionService.js";

export const validateUserActionData = (req, res, next) => {
  const { tipo, targetType, targetId, fecha, idUsuario } = req.body;

  const tipoAccion = ["like", "comentario", "reporte"];
  const tipoContenido = ["publicacion", "observacion"];

  if (!tipo || !tipoAccion.includes(tipo)) {
    throw new AppError("Tipo de accion no válida para la accionUsuario", 400);
  }

  if (!targetType || !tipoContenido.includes(targetType)) {
    throw new AppError(
      "Tipo de contenido no válida para la accionUsuario",
      400
    );
  }

  if (targetId && isNaN(Number(targetId))) {
    throw new AppError("Id del tipo de contenido no válida", 400);
  }

  if (fecha && isNaN(Date.parse(fecha))) {
    throw new AppError("Fecha no válido", 400);
  }

  if (!idUsuario || isNaN(Number(idUsuario))) {
    throw new AppError("idUsuario no válido", 400);
  }

  next();
};

export const validateTargetExists = async (req, res, next) => {
  try {
    let target = null;
    const tipoContenido = req.body.targetType;
    const idTarget = req.body.targetId;

    if (tipoContenido === "publicacion") {
      target = await getPublicationById(idTarget);
    }

    if (tipoContenido === "observacion") {
      target = await getObservationById(idTarget);
    }

    if (!target) {
      throw new AppError(`Target no encontrado`, 404);
    }

    req.target = target;
    next();
  } catch (error) {
    next(error);
  }
};

export const findUserAction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accion = await getUserActionById(id);
    if (!accion) {
      throw new AppError("No se encontró la accion especificado", 404);
    }
    req.accion = accion;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUserExists = async (req, res, next) => {
  try {
    const { idUsuario } = req.body;
    const usuario = await getUserById(idUsuario);
    if (!usuario) {
      throw new AppError("No se encontró el usuario especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateContentRequired = (req, res, next) => {
  if (req.body.tipo === "comentario" || req.body.tipo === "reporte") {
    if (!req.body.contenido) {
      throw new AppError(
        "Necesitas agregar un contenido a un comentario o reporte",
        400
      );
    }
  }
  next();
};

export const validateReportStatus = (req, res, next) => {
  const estado = req.body.estado;
  const reporte = req.accion;

  if (reporte.estado === "rechazada" || reporte.estado === "aceptada") {
    throw new AppError("Este reporte ya esta finalizado");
  }

  const estados = ["rechazada", "aceptada", "en_revision"];
  if (!estados.includes(estado)) {
    throw new AppError("Cambio de estado no valido");
  }

  next();
};
