import Pais from "../models/Pais.js";

export const AgregarPais = async (nombre) => {
  return await Pais.create({ nombre: nombre });
};

export const ModificarPais = async (pais, nombre) => {
  pais.nombre = nombre;
  return await pais.save();
};

export const EliminarPais = async (pais) => {
  return await pais.destroy();
};

export const ListarPaises = async () => {
  return await Pais.findAll();
};

export const ListarPaisEspecifico = async (id) => {
  return await Pais.findByPk(id);
};
