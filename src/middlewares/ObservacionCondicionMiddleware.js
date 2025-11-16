import AppError from "../utils/AppError.js";
import { getObservationConditionByI } from "../service/ObservacionCondicionService.js";
import { getObservationById } from "../service/ObservacionService.js";
import { getConditionTypeById } from "../service/TipoCondicionService.js";

export const validateObservationConditionData = (req, res, next) => {
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

export const findObservationCondition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condicion = await getObservationConditionByI(id);
    if (!condicion) {
      throw new AppError("No se encontró la condicion especificado", 404);
    }
    req.condicion = condicion;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateObservationExists = async (req, res, next) => {
  try {
    const { idObservacion } = req.body;
    const observacion = await getObservationById(idObservacion);
    if (!observacion) {
      throw new AppError("No se encontró la observacion especificado", 404);
    }
    req.observacion = observacion;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateConditionTypeExists = async (req, res, next) => {
  try {
    const { idTipoCondicion } = req.body;
    const tipoCondicion = await getConditionTypeById(idTipoCondicion);
    if (!tipoCondicion) {
      throw new AppError("No se encontró el tipo condicion especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};
