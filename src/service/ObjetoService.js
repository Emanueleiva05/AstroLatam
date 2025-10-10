import Objeto from "../models/Objeto.js";

export const AgregarObjeto = async (nombre, descripcion, idTipoObjeto) => {
  return await Objeto.create({
    nombre: nombre,
    descripcion: descripcion,
    idTipoObjeto: idTipoObjeto,
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
  return await Objeto.findAll();
};

export const ListarObjetoEspecifico = async (id) => {
  return await Objeto.findByPk(id);
};
