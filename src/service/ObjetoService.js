import Objeto from "../models/Objeto.js";
import AppError from "../utils/AppError.js";

export const AgregarObjeto = async (nombre, descripcion, idTipoObjeto) => {
  return await Objeto.create({
    nombre,
    descripcion,
    idTipoObjeto,
  });
};

export const ModificarObjeto = async (
  objeto,
  nombre,
  descripcion,
  idTipoObjeto
) => {
  objeto.nombre = nombre;
  objeto.descripcion = descripcion;
  objeto.idTipoObjeto = idTipoObjeto;
  return await objeto.save();
};

export const EliminarObjeto = async (objeto) => {
  return await objeto.destroy();
};

export const ListarObjetos = async () => {
  const objetos = await Objeto.findAll();
  if (objetos.length === 0) {
    throw new AppError("No se encontraron objetos creados", 404);
  }
  return objetos;
};

export const ListarObjetoEspecifico = async (id) => {
  const objeto = await Objeto.findByPk(id);
  return objeto;
};
