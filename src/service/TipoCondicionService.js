import TipoCondicion from "../models/TipoCondicion.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoCondicion = async (nombre) => {
  const nuevo = await TipoCondicion.create({ nombre });
  await clientRedis.del(`tipoCondicion:listado`);
  return nuevo;
};

export const ModificarTipoCondicion = async (tipoCondicion, nombre) => {
  await clientRedis.del(`tipoCondicion:listado`);
  await clientRedis.del(`tipoCondicion:${tipoCondicion.idTipoCondicion}`);
  tipoCondicion.nombre = nombre;
  return await tipoCondicion.save();
};

export const EliminarTipoCondicion = async (tipoCondicion) => {
  await clientRedis.del(`tipoCondicion:listado`);
  await clientRedis.del(`tipoCondicion:${tipoCondicion.idTipoCondicion}`);
  return await tipoCondicion.destroy();
};

export const ListarTipoCondiciones = async (page, size) => {
  const reply = await clientRedis.get(`tipoCondicion:listado`);
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await TipoCondicion.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoCondiciones creados", 404);
  }

  await clientRedis.set(`tipoCondicion:listado`, JSON.stringify(rows), {
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

export const ListarTipoCondicionEspecifico = async (id) => {
  const reply = await clientRedis.get(`tipoCondicion:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoCondicion = await TipoCondicion.findByPk(id);

  await clientRedis.set(`tipoCondicion:${id}`, JSON.stringify(tipoCondicion), {
    EX: 3600,
  });

  return tipoCondicion;
};
