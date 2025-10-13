import TipoAdjunto from "../models/TipoAdjunto.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoAdjunto = async (nombre) => {
  return await TipoAdjunto.create({ nombre });
};

export const ModificarTipoAdjunto = async (tipoAdjunto, nombre) => {
  tipoAdjunto.nombre = nombre;
  return await tipoAdjunto.save();
};

export const EliminarTipoAdjunto = async (tipoAdjunto) => {
  return await tipoAdjunto.destroy();
};

export const ListarTipoAdjuntos = async () => {
  const tipoAdjuntos = await TipoAdjunto.findAll();
  if (tipoAdjuntos.length === 0) {
    throw new AppError("No se encontraron tipoAdjuntos creados", 404);
  }
  return tipoAdjuntos;
};

export const ListarTipoAdjuntoEspecifico = async (id) => {
  const tipoAdjunto = await TipoAdjunto.findByPk(id);
  return tipoAdjunto;
};
