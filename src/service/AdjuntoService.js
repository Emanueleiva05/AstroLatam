import Adjunto from "../models/Adjunto.js";
import AppError from "../utils/AppError.js";

export const createAttachment = async (
  link_archivo,
  descripcion,
  idTipoAdjunto
) => {
  return await Adjunto.create({
    link_archivo,
    idTipoAdjunto,
    descripcion,
  });
};

export const updateAttachment = async (
  adjunto,
  link_archivo,
  descripcion,
  idTipoAdjunto
) => {
  adjunto.link_archivo = link_archivo;
  adjunto.descripcion = descripcion;
  adjunto.idTipoAdjunto = idTipoAdjunto;
  return await adjunto.save();
};

export const deleteAttachment = async (adjunto) => {
  return await adjunto.destroy();
};

export const getAttachments = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(page) * parseInt(size),
  };

  const { count, rows } = await Adjunto.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron adjuntos creados", 404);
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

export const getAttachmentById = async (id) => {
  const adjunto = await Adjunto.findByPk(id);
  return adjunto;
};
