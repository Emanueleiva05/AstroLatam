import AppError from "../utils/AppError.js";
import {
  getObservationById,
  getObservationAttachmentById,
  getObservationEventById,
  getObservationInstrumentById,
  getObservationObjectById,
} from "../service/ObservacionService.js";
import { getLocationById } from "../service/UbicacionService.js";
import { getInstrumentById } from "../service/InstrumentoService.js";
import { getEventById } from "../service/EventoService.js";
import { getAttachmentById } from "../service/AdjuntoService.js";
import { getObjectById } from "../service/ObjetoService.js";
import {
  getUserById,
  getUserInstrumentById,
} from "../service/UsuarioService.js";

export const validateObservationData = (req, res, next) => {
  const {
    titulo,
    descripcion,
    visibilidad,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
    idUsuario,
  } = req.body;

  if (!titulo || titulo.trim() === "") {
    throw new AppError("Nombre no valido para la observacion", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("descripcion no valido para la observacion", 400);
  }

  if (!horaObservacion) {
    throw new AppError("horaObservacion no valido para la observacion", 400);
  }

  if (!fechaObservacion || isNaN(Date.parse(fechaObservacion))) {
    throw new AppError("fechaObservacion no valido para la observacion", 400);
  }

  if (!idUbicacion || isNaN(Number(idUbicacion))) {
    throw new AppError("idUbicacion no valido", 400);
  }

  if (!["privada", "miembros", "publica"].includes(visibilidad)) {
    throw new AppError("Visibilidad no valida", 400);
  }
  next();
};

export const validateLocationExists = async (req, res, next) => {
  try {
    const { idUbicacion } = req.body;
    const ubicacion = await getLocationById(idUbicacion);
    if (!ubicacion) {
      throw new AppError("No se encontro la ubicacion especifica", 404);
    }

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
      throw new AppError("No se encontro el usuario especifica", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const findObservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const observacion = await getObservationById(id);
    if (!observacion) {
      throw new AppError("No se encontro la observacion especifica", 404);
    }
    req.observacion = observacion;

    next();
  } catch (error) {
    next(error);
  }
};

export const findAttachment = async (req, res, next) => {
  try {
    const { idAdjunto } = req.params;

    const adjunto = await getAttachmentById(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifica", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const findObject = async (req, res, next) => {
  try {
    const { idObjeto } = req.params;

    const objeto = await getObjectById(idObjeto);
    if (!objeto) {
      throw new AppError("No se encontro el objeto especifica", 404);
    }
    req.objeto = objeto;

    next();
  } catch (error) {
    next(error);
  }
};

export const findEvent = async (req, res, next) => {
  try {
    const { idEvento } = req.params;

    const evento = await getEventById(idEvento);
    if (!evento) {
      throw new AppError("No se encontro el evento especifica", 404);
    }
    req.evento = evento;

    next();
  } catch (error) {
    next(error);
  }
};

export const findInstrument = async (req, res, next) => {
  try {
    const { idInstrumento } = req.params;

    const instrumento = await getUserInstrumentById(idInstrumento);
    if (!instrumento) {
      throw new AppError("No se encontro el adjunto especifica", 404);
    }
    req.instrumento = instrumento;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateUserInstrument = async (req, res, next) => {
  try {
    const usuario = await getUserById(req.observacion.idUsuario);

    if (!usuario) throw new AppError("Usuario no encontrado", 404);

    const instrumento = await getUserInstrumentById(
      usuario,
      req.instrumento.idInstrumento
    );

    if (instrumento.length === 0)
      throw new AppError("El instrumento no esta asociado al usuario", 404);

    next();
  } catch (error) {
    next(error);
  }
};

export const findObservationEvent = async (req, res, next) => {
  try {
    const evento = await getObservationEventById(
      req.observacion,
      req.params.idEvento
    );
    if (evento.length === 0) {
      throw new AppError("No se encontro el objeto del evento");
    }
    req.evento = evento[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const findObservationObject = async (req, res, next) => {
  try {
    const objeto = await getObservationObjectById(
      req.observacion,
      req.params.idObjeto
    );
    if (objeto.length === 0) {
      throw new AppError("No se encontro el objeto del evento");
    }
    req.objeto = objeto[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const findObservationAttachment = async (req, res, next) => {
  try {
    const adjunto = await getObservationAttachmentById(
      req.observacion,
      req.params.idAdjunto
    );
    if (adjunto.length === 0) {
      throw new AppError("No se encontro el objeto del evento");
    }
    req.adjunto = adjunto[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const findObservationInstrument = async (req, res, next) => {
  try {
    const instrumento = await getObservationInstrumentById(
      req.observacion,
      req.params.idInstrumento
    );
    if (instrumento.length === 0) {
      throw new AppError("No se encontro el instrumento del evento");
    }
    req.instrumento = instrumento[0];
    next();
  } catch (error) {
    next(error);
  }
};
