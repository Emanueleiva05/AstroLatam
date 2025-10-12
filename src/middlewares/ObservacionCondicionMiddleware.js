import AppError from "../utils/AppError.js";
import { ListarObservacionCondicionEspecifico } from "../service/ObservacionCondicionService.js";
import { ListarObservacionEspecifico } from "../service/ObservacionService.js";
import { ListarTipoCondicionEspecifico } from "../service/TipoCondicionService.js";

export const ValidarDatosObservacionCondicion = (req, res, next) => {
  const { valor, idTipoCondicion, idObservacion } = req.body;

  if (!valor || valor.trim() === "") {
    throw new AppError("Valor no válido para la condicion", 400);
  }

  if (!idTipoCondicion || isNaN(Number(idTipoCondicion))) {
    throw new AppError("idTipoCondicion no válido", 400);
  }

  if (!idObservacion || isNaN(Number(idObservacion))) {
    throw new AppError("idObservacion no válido", 400);
  }

  next();
};

export const EncontrarCondicion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condicion = await ListarObservacionCondicionEspecifico(id);
    if (!condicion) {
      throw new AppError("No se encontró la condicion especificado", 404);
    }
    req.condicion = condicion;
    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaObservacion = async (req, res, next) => {
  try {
    const { idObservacion } = req.body;
    const observacion = await ListarObservacionEspecifico(idObservacion);
    if (!observacion) {
      throw new AppError("No se encontró la observacion especificado", 404);
    }
    req.observacion = observacion;
    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaTipoCondicion = async (req, res, next) => {
  try {
    const { idTipoCondicion } = req.body;
    const tipoCondicion = await ListarTipoCondicionEspecifico(idTipoCondicion);
    if (!tipoCondicion) {
      throw new AppError("No se encontró el tipo condicion especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};
