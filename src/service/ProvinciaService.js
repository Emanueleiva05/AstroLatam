import Provincia from "../models/Provincia.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarProvincia = async (nombre, idPais) => {
  const nuevo = await Provincia.create({ nombre, idPais });
  await clientRedis.del("provincia:listado");
  return nuevo;
};

export const ModificarProvincia = async (provincia, nombre) => {
  await clientRedis.del("provincia:listado");
  await clientRedis.del(`provincia:${provincia.idProvincia}`);
  provincia.nombre = nombre;
  return await provincia.save();
};

export const EliminarProvincia = async (provincia) => {
  await clientRedis.del("provincia:listado");
  await clientRedis.del(`provincia:${provincia.idProvincia}`);
  return await provincia.destroy();
};

export const ListarProvincias = async (page, size) => {
  const reply = await clientRedis.get("provincia:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Provincia.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron provincias creados", 404);
  }

  await clientRedis.set("provincia:listado", JSON.stringify(rows), {
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

export const ListarProvinciaEspecifico = async (id) => {
  const reply = await clientRedis.get(`provincia:${id}`);
  if (reply) return JSON.parse(reply);

  const provincia = await Provincia.findByPk(id);
  await clientRedis.set(`provincia:${id}`, JSON.stringify(provincia), {
    EX: 3600,
  });

  return provincia;
};
