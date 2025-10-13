import TipoEvento from "../models/TipoEvento.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoEvento = async (nombre) => {
  return await TipoEvento.create({ nombre });
};

export const ModificarTipoEvento = async (tipoEvento, nombre) => {
  tipoEvento.nombre = nombre;
  return await tipoEvento.save();
};

export const EliminarTipoEvento = async (tipoEvento) => {
  return await tipoEvento.destroy();
};

export const ListarTipoEventos = async () => {
  const tipoEventos = await TipoEvento.findAll();
  if (tipoEventos.length === 0) {
    throw new AppError("No se encontraron tipoEventos creados", 404);
  }
  return tipoEventos;
};

export const ListarTipoEventoEspecifico = async (id) => {
  const tipoEvento = await TipoEvento.findByPk(id);
  return tipoEvento;
};
