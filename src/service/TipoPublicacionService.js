import TipoPublicacion from "../models/TipoPublicacion.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoPublicacion = async (nombre, descripcion) => {
  return await TipoPublicacion.create({
    nombre: nombre,
    descripcion: descripcion,
  });
};

export const ModificarTipoPublicacion = async (
  tipoPublicacion,
  nombre,
  descripcion
) => {
  tipoPublicacion.nombre = nombre;
  tipoPublicacion.descripcion = descripcion;
  return await tipoPublicacion.save();
};

export const EliminarTipoPublicacion = async (tipoPublicacion) => {
  return await tipoPublicacion.destroy();
};

export const ListarTipoPublicaciones = async () => {
  const tipoPublicaciones = await TipoPublicacion.findAll();
  if (tipoPublicaciones.length === 0) {
    throw new AppError("No se encontraron tipoPublicaciones creados", 404);
  }
  return tipoPublicaciones;
};

export const ListarTipoPublicacionEspecifico = async (id) => {
  const tipoPublicacion = await TipoPublicacion.findByPk(id);
  if (!tipoPublicacion) {
    throw new AppError("No se encontro el tipoPublicacion especifico", 404);
  }
  return tipoPublicacion;
};
