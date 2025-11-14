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

export const ListarTipoAdjuntos = async (page, size) => {
  const reply = await clientRedis.get("tipoAdjunto:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await TipoAdjunto.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoAdjuntos creados", 404);
  }

  await clientRedis.set("ipoAdjunto:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };
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
