import TipoInstrumento from "../models/TipoInstrumento.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoInstrumento = async (nombre, descripcion) => {
  return await TipoInstrumento.create({
    nombre: nombre,
    descripcion: descripcion,
  });
};

export const ModificarTipoInstrumento = async (
  tipoInstrumento,
  nombre,
  descripcion
) => {
  tipoInstrumento.nombre = nombre;
  tipoInstrumento.descripcion = descripcion;
  return await tipoInstrumento.save();
};

export const EliminarTipoInstrumento = async (tipoInstrumento) => {
  return await tipoInstrumento.destroy();
};

export const ListarTipoInstrumentos = async () => {
  const tipoInstrumentos = await TipoInstrumento.findAll();
  if (tipoInstrumentos.length === 0) {
    throw new AppError("No se encontraron tipoEventos creados", 404);
  }
  return tipoInstrumentos;
};

export const ListarTipoInstrumentoEspecifico = async (id) => {
  const tipoInstrumento = await TipoInstrumento.findByPk(id);
  if (!tipoInstrumento) {
    throw new AppError("No se encontro el tipoInstrumento especifico", 404);
  }
  return tipoInstrumento;
};
