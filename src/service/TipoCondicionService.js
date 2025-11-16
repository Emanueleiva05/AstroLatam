import TipoCondicion from "../models/TipoCondicion.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const createConditionType = async (nombre) => {
  const nuevo = await TipoCondicion.create({ nombre });
  await clientRedis.del(`tipoCondicion:listado`);
  return nuevo;
};

export const updateConditionType = async (tipoCondicion, nombre) => {
  await clientRedis.del(`tipoCondicion:listado`);
  await clientRedis.del(`tipoCondicion:${tipoCondicion.idTipoCondicion}`);
  tipoCondicion.nombre = nombre;
  return await tipoCondicion.save();
};

export const deleteConditionType = async (tipoCondicion) => {
  await clientRedis.del(`tipoCondicion:listado`);
  await clientRedis.del(`tipoCondicion:${tipoCondicion.idTipoCondicion}`);
  return await tipoCondicion.destroy();
};

export const getConditionTypes = async () => {
  const reply = await clientRedis.get(`tipoCondicion:listado`);
  if (reply) return JSON.parse(reply);

  const rows = await TipoCondicion.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoCondiciones creados", 404);
  }

  await clientRedis.set(`tipoCondicion:listado`, JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const getConditionTypeById = async (id) => {
  const reply = await clientRedis.get(`tipoCondicion:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoCondicion = await TipoCondicion.findByPk(id);

  await clientRedis.set(`tipoCondicion:${id}`, JSON.stringify(tipoCondicion), {
    EX: 3600,
  });

  return tipoCondicion;
};
