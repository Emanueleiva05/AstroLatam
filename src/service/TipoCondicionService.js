import TipoCondicion from "../models/TipoCondicion.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoCondicion = async (nombre) => {
  return await TipoCondicion.create({ nombre: nombre });
};

export const ModificarTipoCondicion = async (tipoCondicion, nombre) => {
  tipoCondicion.nombre = nombre;
  return await tipoCondicion.save();
};

export const EliminarTipoCondicion = async (tipoCondicion) => {
  return await tipoCondicion.destroy();
};

export const ListarTipoCondiciones = async () => {
  const tipoCondiciones = await TipoCondicion.findAll();
  if (tipoCondiciones.length === 0) {
    throw new AppError("No se encontraron tipoCondiciones creados", 404);
  }
  return tipoCondiciones;
};

export const ListarTipoCondicionEspecifico = async (id) => {
  const tipoCondicion = await TipoCondicion.findByPk(id);
  if (!tipoCondicion) {
    throw new AppError("No se encontro el tipoCondicion especifico", 404);
  }
  return tipoCondicion;
};
