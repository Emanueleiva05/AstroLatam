import Publicacion from "../models/Publicacion.js";
import AppError from "../utils/AppError.js";

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
  descripcion
) => {
  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  return await publicacion.save();
};

export const EliminarPublicacion = async (publicacion) => {
  return await publicacion.destroy();
};

export const ListarPublicaciones = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 0;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const publicaciones = await Publicacion.findAll(options);
  if (publicaciones.length === 0) {
    throw new AppError("No se encontraron publicacion creados", 404);
  }
  return publicaciones;
};

export const ListarPublicacionEspecifico = async (id) => {
  const publicacion = await Publicacion.findByPk(id);
  return publicacion;
};

export const VisibilidadPublicacion = async (publicacion, estado) => {
  publicacion.visibilidad = estado;
  return await publicacion.save();
};
