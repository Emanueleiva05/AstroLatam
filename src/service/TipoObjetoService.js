import TipoObjeto from "../models/TipoObjeto.js";

export const AgregarTipoObjeto = async (nombre, descripcion) => {
  return await TipoObjeto.create({ nombre: nombre, descripcion: descripcion });
};

export const ModificarTipoObjeto = async (tipoObjeto, nombre, descripcion) => {
  tipoObjeto.nombre = nombre;
  tipoObjeto.descripcion = descripcion;
  return await tipoObjeto.save();
};

export const EliminarTipoObjeto = async (tipoObjeto) => {
  return await tipoObjeto.destroy();
};

export const ListarTipoObjetos = async () => {
  return await TipoObjeto.findAll();
};

export const ListarTipoObjetoEspecifico = async (id) => {
  return await TipoObjeto.findByPk(id);
};
