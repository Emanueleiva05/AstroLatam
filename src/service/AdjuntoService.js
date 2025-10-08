import Adjunto from "../models/Adjunto.js";

export const AgregarAdjunto = async (
  link_archivo,
  descripcion,
  idTipoAdjunto
) => {
  return await Adjunto.create({
    link_archivo: link_archivo,
    idTipoAdjunto: idTipoAdjunto,
    descripcion: descripcion,
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

export const EliminarPublicacion = async (adjunto) => {
  return await adjunto.destroy();
};

export const ListarAdjunto = async (id) => {
  return await Adjunto.findAll();
};

export const ListarAdjuntoEspecifico = async (id) => {
  return await Adjunto.findByPk(id);
};
