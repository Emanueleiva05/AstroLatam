import TipoEvento from "../models/TipoEvento.js";

export const AgregarTipoEvento = async (nombre) => {
  return await TipoEvento.create({ nombre: nombre });
};

export const ModificarTipoEvento = async (tipoEvento, nombre) => {
  tipoEvento.nombre = nombre;
  return await tipoEvento.save();
};

export const EliminarTipoEvento = async (tipoEvento) => {
  return await tipoEvento.destroy();
};

export const ListarTipoEventos = async () => {
  return await TipoEvento.findAll();
};

export const ListarTipoEventoEspecifico = async (id) => {
  return await TipoEvento.findByPk(id);
};
