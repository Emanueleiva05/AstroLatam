import TipoAdjunto from "../models/TipoAdjunto.js";

export const AgregarTipoAdjunto = async (nombre) => {
  return await TipoAdjunto.create({ nombre: nombre });
};

export const ModificarTipoAdjunto = async (tipoAdjunto, nombre) => {
  tipoAdjunto.nombre = nombre;
  return await tipoAdjunto.save();
};

export const EliminarTipoAdjunto = async (tipoAdjunto) => {
  return await tipoAdjunto.destroy();
};

export const ListarTipoAdjuntos = async () => {
  return await TipoAdjunto.findAll();
};

export const ListarTipoAdjuntoEspecifico = async (id) => {
  return await TipoAdjunto.findByPk(id);
};
