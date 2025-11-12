import Pais from "../models/Pais.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

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
  const reply = await clientRedis.get("paises");

  if (reply) return JSON.parse(reply);

  const paises = await Pais.findAll();
  if (paises.length === 0) {
    throw new AppError("No se encontraron paises creados", 404);
  }

  await clientRedis.set("paises", JSON.stringify(paises));

  return paises;
};

export const ListarPaisEspecifico = async (id) => {
  const reply = await clientRedis.get(`/pais/${id}`);

  if (reply) return JSON.parse(reply);

  const pais = await Pais.findByPk(id);

  await clientRedis.set(`/pais/${id}`, JSON.stringify(pais));

  return pais;
};
