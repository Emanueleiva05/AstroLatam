import TipoObjeto from "../models/TipoObjeto.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const createObjectType = async (nombre, descripcion) => {
  const nuevo = await TipoObjeto.create({ nombre, descripcion });

  await clientRedis.del("tipoObjeto:listado");

  return nuevo;
};

export const updateObjectType = async (tipoObjeto, nombre, descripcion) => {
  await clientRedis.del("tipoObjeto:listado");
  await clientRedis.del(`tipoObjeto:${tipoObjeto.idTipoObjeto}`);
  tipoObjeto.nombre = nombre;
  tipoObjeto.descripcion = descripcion;

  return await tipoObjeto.save();
};

export const deleteObjectType = async (tipoObjeto) => {
  await clientRedis.del("tipoObjeto:listado");
  await clientRedis.del(`tipoObjeto:${tipoObjeto.idTipoObjeto}`);

  return await tipoObjeto.destroy();
};

export const getObjectTypes = async () => {
  const reply = await clientRedis.get("tipoObjeto:listado");
  if (reply) return JSON.parse(reply);

  const rows = await TipoObjeto.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoObjetos creados", 404);
  }

  await clientRedis.set("tipoObjeto:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const getObjectTypeById = async (id) => {
  const reply = await clientRedis.get(`tipoObjeto:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoObjeto = await TipoObjeto.findByPk(id);

  await clientRedis.set(`tipoObjeto:${id}`, JSON.stringify(tipoObjeto), {
    EX: 3600,
  });
  return tipoObjeto;
};
