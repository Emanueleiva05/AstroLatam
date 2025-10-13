import TipoObjeto from "../models/TipoObjeto.js";
import { AppError } from "../utils/AppError.js";

export const AgregarTipoObjeto = async (nombre, descripcion) => {
  return await TipoObjeto.create({ nombre, descripcion });
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
  const tipoObjetos = await TipoObjeto.findAll();
  if (tipoObjetos.length === 0) {
    throw new AppError("No se encontraron tipoObjetos creados", 404);
  }
  return tipoObjetos;
};

export const ListarTipoObjetoEspecifico = async (id) => {
  const tipoObjeto = await TipoObjeto.findByPk(id);
  return tipoObjeto;
};
