import Pais from "../models/Pais.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarPais = async (nombre) => {
  const nuevo = await Pais.create({ nombre });
  await clientRedis.del("pais:listado");
  return nuevo;
};

export const ModificarPais = async (pais, nombre) => {
  await clientRedis.del("pais:listado");
  await clientRedis.del(`pais:${pais.idPais}`);
  pais.nombre = nombre;
  return await pais.save();
};

export const EliminarPais = async (pais) => {
  await clientRedis.del("pais:listado");
  await clientRedis.del(`pais:${pais.idPais}`);
  return await pais.destroy();
};

export const ListarPaises = async (page, size) => {
  const reply = await clientRedis.get("pais:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Pais.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron paises creados", 404);
  }

  await clientRedis.set("pais:listado", JSON.stringify(rows), { EX: 3600 });

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

export const ListarPaisEspecifico = async (id) => {
  const reply = await clientRedis.get(`pais:${id}`);

  if (reply) return JSON.parse(reply);

  const pais = await Pais.findByPk(id);

  await clientRedis.set(`pais:${id}`, JSON.stringify(pais), { EX: 3600 });

  return pais;
};
