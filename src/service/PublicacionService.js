import Publicacion from "../models/Publicacion.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const createPublication = async (
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

export const updatePublication = async (publicacion, titulo, descripcion) => {
  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  return await publicacion.save();
};

export const deletePublication = async (publicacion) => {
  return await publicacion.destroy();
};

export const getPublications = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const reply = await clientRedis.get(
    `publicacion:listado:page=${page}:size=${size}`
  );
  if (reply) return JSON.parse(reply);

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Publicacion.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron publicacion creados", 404);
  }

  const response = {
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

  await clientRedis.set(
    `publicacion:listado:page=${page}:size=${size}`,
    JSON.stringify(response),
    {
      EX: 3600,
    }
  );

  return response;
};

export const getPublicationById = async (id) => {
  const publicacion = await Publicacion.findByPk(id);
  return publicacion;
};

export const updatePublicationVisibility = async (publicacion, estado) => {
  publicacion.visibilidad = estado;
  return await publicacion.save();
};
