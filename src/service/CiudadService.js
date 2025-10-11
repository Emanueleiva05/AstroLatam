import Ciudad from "../models/Ciudad.js";
import { AppError } from "../utils/AppError.js";

export const AgregarCiudad = async (nombre, idProvincia) => {
  return await Ciudad.create({ nombre: nombre, idProvincia: idProvincia });
};

export const ModificarCiudad = async (ciudad, nombre) => {
  ciudad.nombre = nombre;
  return await ciudad.save();
};

export const EliminarCiudad = async (ciudad) => {
  return await ciudad.destroy();
};

export const ListarCiudades = async () => {
  const ciudades = await Ciudad.findAll();
  if (ciudades.length === 0) {
    throw new AppError("No se encontraron ciudades creadas", 404);
  }
  return ciudades;
};

export const ListarCiudadEspecifico = async (id) => {
  const ciudad = await Ciudad.findByPk(id);
  if (!ciudad) {
    throw new AppError("No se encontro la ciudad especifica", 404);
  }
  return ciudad;
};
