import AppError from "../utils/AppError.js";
import {
  ListarEvento,
  ListarAdjuntosEspecificoEvento,
  ListarPaisesEspecificoEvento,
} from "../service/EventoService.js";
import { ListarTipoEventoEspecifico } from "../service/TipoEventoService.js";
import { ListarAdjuntoEspecifico } from "../service/AdjuntoService.js";
import { ListarPaisEspecifico } from "../service/PaisService.js";
import { ListarObjetoEspecifico } from "../service/ObjetoService.js";

export const ValidarDatosEvento = (req, res, next) => {
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

export const EncontrarEvento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const evento = await ListarEvento(id);
    if (!evento) {
      throw new AppError("No se encontro el evento especifica", 404);
    }
    req.evento = evento;

    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaTipoEvento = async (req, res, next) => {
  try {
    const { idTipoEvento } = req.body;

    const tipoEvento = await ListarTipoEventoEspecifico(idTipoEvento);
    if (!tipoEvento) {
      throw new AppError("No se encontro la tipoEvento especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarAdjunto = async (req, res, next) => {
  try {
    const { idAdjunto } = req.params;

    const adjunto = await ListarAdjuntoEspecifico(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifico", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarPais = async (req, res, next) => {
  try {
    const { idPais } = req.params;

    const pais = await ListarPaisEspecifico(idPais);
    if (!pais) {
      throw new AppError("No se encontro el pais especifico", 404);
    }
    req.pais = pais;

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
      throw new AppError("No se encontro el objeto especifico", 404);
    }
    req.objeto = objeto;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarAdjuntoEvento = async (req, res, next) => {
  try {
    const adjunto = await ListarAdjuntosEspecificoEvento(
      req.evento,
      req.params.idAdjunto
    );
    if (adjunto.length === 0) {
      throw new AppError("No se encontro el adjunto del evento");
    }
    req.adjunto = adjunto[0];
    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarPaisEvento = async (req, res, next) => {
  try {
    const pais = await ListarPaisesEspecificoEvento(
      req.evento,
      req.params.idPais
    );
    if (pais.length === 0) {
      throw new AppError("No se encontro el pais del evento");
    }
    req.pais = pais[0];
    next();
  } catch (error) {
    next(error);
  }
};
