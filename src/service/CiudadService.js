import Ciudad from "../models/Ciudad.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarCiudad = async (nombre, idProvincia) => {
  return await Ciudad.create({ nombre, idProvincia });
};

export const ModificarCiudad = async (ciudad, nombre) => {
  ciudad.nombre = nombre;
  return await ciudad.save();
};

export const EliminarCiudad = async (ciudad) => {
  return await ciudad.destroy();
};

export const ListarCiudades = async () => {
  const reply = await clientRedis.get("ciudades");

  if (reply) return JSON.parse(reply);

  const ciudades = await Ciudad.findAll();

  if (ciudades.length === 0) {
    throw new AppError("No se encontraron ciudades creadas", 404);
  }

  await clientRedis.set("ciudades", JSON.stringify(ciudades));

  return ciudades;
};

export const ListarCiudadEspecifico = async (id) => {
  const reply = await clientRedis.get(`/ciudad/${id}`);

  if (reply) return JSON.parse(reply);

  const ciudad = await Ciudad.findByPk(id);

  await clientRedis.set(`/ciudad/${id}`, JSON.stringify(ciudad));

  return ciudad;
};
