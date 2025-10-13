import Pais from "../models/Pais.js";
import AppError from "../utils/AppError.js";

export const AgregarPais = async (nombre) => {
  return await Pais.create({ nombre });
};

export const ModificarPais = async (pais, nombre) => {
  pais.nombre = nombre;
  return await pais.save();
};

export const EliminarPais = async (pais) => {
  return await pais.destroy();
};

export const ListarPaises = async () => {
  const paises = await Pais.findAll();
  if (paises.length === 0) {
    throw new AppError("No se encontraron paises creados", 404);
  }
  return paises;
};

export const ListarPaisEspecifico = async (id) => {
  const pais = await Pais.findByPk(id);
  return pais;
};
