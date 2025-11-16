import ObservacionCondicion from "../models/ObservacionCondicion.js";
import AppError from "../utils/AppError.js";

export const createObservationCondition = async (
  valor,
  idTipoCondicion,
  idObservacion
) => {
  return await ObservacionCondicion.create({
    valor,
    idTipoCondicion,
    idObservacion,
  });
};

export const updateObservationCondition = async (
  observacionCondicion,
  valor,
  idTipoCondicion,
  idObservacion
) => {
  observacionCondicion.idTipoCondicion = idTipoCondicion;
  observacionCondicion.valor = valor;
  observacionCondicion.idObservacion = idObservacion;
  return await observacionCondicion.save();
};

export const deleteObservationCondition = async (observacionCondicion) => {
  return await observacionCondicion.destroy();
};

export const getObservationConditions = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await ObservacionCondicion.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron objetos condiciones creados", 404);
  }

  return {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };
};

export const getObservationConditionByI = async (id) => {
  const observacionCondicion = await ObservacionCondicion.findByPk(id);
  return observacionCondicion;
};
