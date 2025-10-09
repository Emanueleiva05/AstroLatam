import Provincia from "../models/Provincia.js";

export const AgregarProvincia = async (nombre, idPais) => {
  return await Provincia.create({ nombre: nombre, idPais: idPais });
};

export const ModificarProvincia = async (provincia, nombre) => {
  provincia.nombre = nombre;
  return await provincia.save();
};

export const EliminarProvincia = async (provincia) => {
  return await provincia.destroy();
};

export const ListarProvincias = async () => {
  return await Provincia.findAll({ include: ["Pais"] });
};

export const ListarProvinciaEspecifico = async (id) => {
  return await Provincia.findByPk(id);
};
