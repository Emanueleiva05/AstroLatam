import Ciudad from "../models/Ciudad.js";

export const AgregarCiudad = async (nombre, idProvincia) => {
  return await Ciudad.create({ nombre: nombre, idProvincia: idProvincia });
};

export const ModificarCiudad = async (ciudad, nombre) => {
  ciudad.nombre = nombre;
  return await ciudad.save();
};

export const EliminarProvincia = async (ciudad) => {
  return await ciudad.destroy();
};

export const ListarCiudades = async () => {
  return await Ciudad.findAll({ include: ["Provincia"] });
};

export const ListarCiudadEspecifico = async (id) => {
  return await Ciudad.findByPk(id);
};
