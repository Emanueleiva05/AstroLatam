import AppError from "../utils/AppError.js";
import {
  ListarObservacionEspecifico,
  ListarAdjuntosEspecificoObservacion,
  ListarEventoEspecificoObservacion,
  ListarInstrumentoEspecificoObservacion,
  ListarObjetosEspecificoObservacion,
} from "../service/ObservacionService.js";
import { ListarUbicacionEspecifico } from "../service/UbicacionService.js";
import { ListarInstrumentoEspecifico } from "../service/InstrumentoService.js";
import { ListarEvento } from "../service/EventoService.js";
import { ListarObjetoEspecifico } from "../service/ObjetoService.js";

export const ValidarDatosObservacion = (req, res, next) => {
  const {
    titulo,
    descripcion,
    visibilidad,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
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

export const VerificarExistenciaUbicacion = async (req, res, next) => {
  try {
    const { idUbicacion } = req.body;

    const ubicacion = await ListarUbicacionEspecifico(idUbicacion);
    if (!ubicacion) {
      throw new AppError("No se encontro la ubicacion especifica", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarObservacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const observacion = await ListarObservacionEspecifico(id);
    if (!observacion) {
      throw new AppError("No se encontro la observacion especifica", 404);
    }
    req.observacion = observacion;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarAdjunto = async (req, res, next) => {
  try {
    const { idAdjunto } = req.params;

    const adjunto = await ListarInstrumentoEspecifico(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifica", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarObjeto = async (req, res, next) => {
  try {
    const { idObjeto } = req.params;

    const objeto = await ListarObjetoEspecifico(idObjeto);
    if (!objeto) {
      throw new AppError("No se encontro el objeto especifica", 404);
    }
    req.objeto = objeto;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarEvento = async (req, res, next) => {
  try {
    const { idEvento } = req.params;

    const evento = await ListarEvento(idEvento);
    if (!evento) {
      throw new AppError("No se encontro el evento especifica", 404);
    }
    req.evento = evento;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarInstrumento = async (req, res, next) => {
  try {
    const { idInstrumento } = req.params;

    const instrumento = await ListarInstrumentoEspecifico(idInstrumento);
    if (!instrumento) {
      throw new AppError("No se encontro el adjunto especifica", 404);
    }
    req.instrumento = instrumento;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarObservacionEvento = async (req, res, next) => {
  try {
    const evento = await ListarEventoEspecificoObservacion(
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

export const EncontrarObservacionObjeto = async (req, res, next) => {
  try {
    const objeto = await ListarObjetosEspecificoObservacion(
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

export const EncontrarObservacionAdjunto = async (req, res, next) => {
  try {
    const adjunto = await ListarAdjuntosEspecificoObservacion(
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

export const EncontrarObservacionInstrumento = async (req, res, next) => {
  try {
    const instrumento = await ListarInstrumentoEspecificoObservacion(
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
