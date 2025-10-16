import AppError from "../utils/AppError.js";
import { ListarEvento } from "../service/EventoService.js";
import { ListarTipoEventoEspecifico } from "../service/TipoEventoService.js";

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
