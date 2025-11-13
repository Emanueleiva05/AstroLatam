import ObservacionCondicion from "../models/ObservacionCondicion.js";
import AppError from "../utils/AppError.js";

export const AgregarObservacionCondicion = async (
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

export const ModificarObservacionCondicion = async (
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

export const EliminarObservacionCondicion = async (observacionCondicion) => {
  return await observacionCondicion.destroy();
};

export const ListarObservacionCondiciones = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 0;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const observacionCondiciones = await ObservacionCondicion.findAll(options);
  if (observacionCondiciones.length === 0) {
    throw new AppError("No se encontraron objetos condiciones creados", 404);
  }
  return observacionCondiciones;
};

export const ListarObservacionCondicionEspecifico = async (id) => {
  const observacionCondicion = await ObservacionCondicion.findByPk(id);
  return observacionCondicion;
};
