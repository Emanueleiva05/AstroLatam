import Provincia from "../models/Provincia.js";
import AppError from "../utils/AppError.js";

export const AgregarProvincia = async (nombre, idPais) => {
  return await Provincia.create({ nombre, idPais });
};

export const ModificarProvincia = async (provincia, nombre) => {
  provincia.nombre = nombre;
  return await provincia.save();
};

export const EliminarProvincia = async (provincia) => {
  return await provincia.destroy();
};

export const ListarProvincias = async () => {
  const provincias = await Provincia.findAll();
  if (provincias.length === 0) {
    throw new AppError("No se encontraron provincias creados", 404);
  }
  return provincias;
};

export const ListarProvinciaEspecifico = async (id) => {
  const provincia = await Provincia.findByPk(id);
  return provincia;
};
