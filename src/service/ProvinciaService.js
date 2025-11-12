import Provincia from "../models/Provincia.js";
import clientRedis from "../settings/redis.js";
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
  const reply = await clientRedis.get("provincias");
  if (reply) return JSON.parse(reply);

  const provincias = await Provincia.findAll();
  if (provincias.length === 0) {
    throw new AppError("No se encontraron provincias creados", 404);
  }

  await clientRedis.set("provincias", JSON.stringify(provincias));

  return provincias;
};

export const ListarProvinciaEspecifico = async (id) => {
  const reply = await clientRedis.get(`/provincia/${id}`);
  if (reply) return JSON.parse(reply);

  const provincia = await Provincia.findByPk(id);
  await clientRedis.set(`/provincia/${id}`, JSON.stringify(provincia));

  return provincia;
};
