import Provincia from "../models/Provincia.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const createProvince = async (nombre, idPais) => {
  const nuevo = await Provincia.create({ nombre, idPais });
  await clientRedis.del("provincia:listado");
  return nuevo;
};

export const updateProvince = async (provincia, nombre) => {
  await clientRedis.del("provincia:listado");
  await clientRedis.del(`provincia:${provincia.idProvincia}`);
  provincia.nombre = nombre;
  return await provincia.save();
};

export const deleteProvince = async (provincia) => {
  await clientRedis.del("provincia:listado");
  await clientRedis.del(`provincia:${provincia.idProvincia}`);
  return await provincia.destroy();
};

export const getProvincies = async () => {
  const reply = await clientRedis.get("provincia:listado");
  if (reply) return JSON.parse(reply);

  const rows = await Provincia.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron provincias creados", 404);
  }

  await clientRedis.set("provincia:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const getProvincieById = async (id) => {
  const reply = await clientRedis.get(`provincia:${id}`);
  if (reply) return JSON.parse(reply);

  const provincia = await Provincia.findByPk(id);
  await clientRedis.set(`provincia:${id}`, JSON.stringify(provincia), {
    EX: 3600,
  });

  return provincia;
};
