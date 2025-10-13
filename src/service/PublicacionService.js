import Publicacion from "../models/Publicacion.js";
import { AppError } from "../utils/AppError.js";

export const AgregarPublicacion = async (
  titulo,
  descripcion,
  idUsuario,
  fechaPublicacion,
  idTipoPublicacion
) => {
  return await Publicacion.create({
    titulo,
    idTipoPublicacion,
    descripcion,
    fechaPublicacion,
    idUsuario,
  });
};

export const ModificarPublicacion = async (
  publicacion,
  titulo,
  descripcion,
  idUsuario,
  fechaPublicacion,
  idTipoPublicacion
) => {
  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  publicacion.fechaPublicacion = fechaPublicacion;
  publicacion.idTipoPublicacion = idTipoPublicacion;
  publicacion.idUsuario = idUsuario;
  return await publicacion.save();
};

export const EliminarPublicacion = async (publicacion) => {
  return await publicacion.destroy();
};

export const ListarPublicaciones = async (id) => {
  const publicaciones = await Publicacion.findAll();
  if (publicaciones.length === 0) {
    throw new AppError("No se encontraron publicacion creados", 404);
  }
  return publicaciones;
};

export const ListarPublicacionEspecifico = async (id) => {
  const publicacion = await Publicacion.findByPk(id);
  return publicacion;
};
