import Adjunto from "../models/Adjunto.js";
import AppError from "../utils/AppError.js";

export const AgregarAdjunto = async (
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

export const ModificarAdjunto = async (
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

export const EliminarAdjunto = async (adjunto) => {
  return await adjunto.destroy();
};

export const ListarAdjunto = async (id) => {
  const adjuntos = await Adjunto.findAll();
  if (adjuntos.length === 0) {
    throw new AppError("No se encontraron adjuntos creados", 404);
  }
  return adjuntos;
};

export const ListarAdjuntoEspecifico = async (id) => {
  const adjunto = await Adjunto.findByPk(id);
  return adjunto;
};
