import AppError from "../utils/AppError.js";
import {
  getEventById,
  getEventAttachment,
  getEventCountry,
  getEventObject,
} from "../service/EventoService.js";
import { getEventTypeById } from "../service/TipoEventoService.js";
import { getAttachmentById } from "../service/AdjuntoService.js";
import { getCountryById } from "../service/PaisService.js";
import { getObjectById } from "../service/ObjetoService.js";

export const validateEventData = (req, res, next) => {
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el evento", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("descripcion no valido para el evento", 400);
  }

  if (!horaInicio) {
    throw new AppError("horaInicio no valido para el evento", 400);
  }

  if (!horaFin) {
    throw new AppError("horaFin no valido para el evento", 400);
  }

  if (!fechaInicio || isNaN(Date.parse(fechaInicio))) {
    throw new AppError("fechaInicio no valido para el evento", 400);
  }

  if (!fechaFin || isNaN(Date.parse(fechaFin))) {
    throw new AppError("fechaFin no valido para el evento", 400);
  }

  if (!idTipoEvento || isNaN(Number(idTipoEvento))) {
    throw new AppError("idTipoEVento no valido", 400);
  }

  next();
};

export const findEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const evento = await getEventById(id);
    if (!evento) {
      throw new AppError("No se encontro el evento especifica", 404);
    }
    req.evento = evento;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateEventTypeExists = async (req, res, next) => {
  try {
    const { idTipoEvento } = req.body;

    const tipoEvento = await getEventTypeById(idTipoEvento);
    if (!tipoEvento) {
      throw new AppError("No se encontro la tipoEvento especifico", 404);
    }

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
      throw new AppError("No se encontro el adjunto especifico", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const findCountry = async (req, res, next) => {
  try {
    const { idPais } = req.params;

    const pais = await getCountryById(idPais);
    if (!pais) {
      throw new AppError("No se encontro el pais especifico", 404);
    }
    req.pais = pais;

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
      throw new AppError("No se encontro el objeto especifico", 404);
    }
    req.objeto = objeto;

    next();
  } catch (error) {
    next(error);
  }
};

export const findEventAttachment = async (req, res, next) => {
  try {
    const adjunto = await getEventAttachment(req.evento, req.params.idAdjunto);
    if (adjunto.length === 0) {
      throw new AppError("No se encontro el adjunto del evento");
    }
    req.adjunto = adjunto[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const findEventCountry = async (req, res, next) => {
  try {
    const pais = await getEventCountry(req.evento, req.params.idPais);
    if (pais.length === 0) {
      throw new AppError("No se encontro el pais del evento");
    }
    req.pais = pais[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const findEventObject = async (req, res, next) => {
  try {
    const objeto = await getEventObject(req.evento, req.params.idObjeto);
    if (objeto.length === 0) {
      throw new AppError("No se encontro el objeto del evento");
    }
    req.objeto = objeto[0];
    next();
  } catch (error) {
    next(error);
  }
};
