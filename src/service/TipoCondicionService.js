import TipoCondicion from "../models/TipoCondicion.js";

export const AgregarTipoCondicion = async (nombre) => {
  return await TipoCondicion.create({ nombre: nombre });
};

export const ModificarTipoCondicion = async (tipoCondicion, nombre) => {
  tipoCondicion.nombre = nombre;
  return await tipoCondicion.save();
};

export const EliminarTipoCondicion = async (tipoCondicion) => {
  return await tipoCondicion.destroy();
};

export const ListarTipoCondiciones = async () => {
  return await TipoCondicion.findAll();
};

export const ListarTipoCondicionEspecifico = async (id) => {
  return await TipoCondicion.findByPk(id);
};
