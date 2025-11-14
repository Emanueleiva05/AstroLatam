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
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Publicacion.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron publicacion creados", 404);
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

export const ListarPublicacionEspecifico = async (id) => {
  const publicacion = await Publicacion.findByPk(id);
  return publicacion;
};

export const VisibilidadPublicacion = async (publicacion, estado) => {
  publicacion.visibilidad = estado;
  return await publicacion.save();
};
