import TipoAdjunto from "../models/TipoAdjunto.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarTipoAdjunto = async (nombre) => {
  const nuevo = await TipoAdjunto.create({ nombre });
  await clientRedis.del("tipoAdjunto:listado");
  return nuevo;
};

export const ModificarTipoAdjunto = async (tipoAdjunto, nombre) => {
  await clientRedis.del("tipoAdjunto:listado");
  await clientRedis.del(`tipoAdjunto${tipoAdjunto.idTipoAdjunto}`);
  tipoAdjunto.nombre = nombre;
  return await tipoAdjunto.save();
};

export const EliminarTipoAdjunto = async (tipoAdjunto) => {
  await clientRedis.del("tipoAdjunto:listado");
  await clientRedis.del(`tipoAdjunto${tipoAdjunto.idTipoAdjunto}`);
  return await tipoAdjunto.destroy();
};

export const ListarTipoAdjuntos = async () => {
  const reply = await clientRedis.get("tipoAdjunto:listado");
  if (reply) return JSON.parse(reply);

  const tipoAdjuntos = await TipoAdjunto.findAll();
  if (tipoAdjuntos.length === 0) {
    throw new AppError("No se encontraron tipoAdjuntos creados", 404);
  }

  await clientRedis.set("ipoAdjunto:listado", JSON.stringify(tipoAdjuntos), {
    EX: 3600,
  });

  return tipoAdjuntos;
};

export const ListarTipoAdjuntoEspecifico = async (id) => {
  const reply = await clientRedis.get(`tipoAdjunto${id}`);
  if (reply) return JSON.parse(reply);

  const tipoAdjunto = await TipoAdjunto.findByPk(id);
  await clientRedis.set(`tipoAdjunto${id}`, JSON.stringify(tipoAdjunto), {
    EX: 3600,
  });

  return tipoAdjunto;
};
