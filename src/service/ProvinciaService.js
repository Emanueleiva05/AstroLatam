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

export const ListarProvincias = async () => {
  const reply = await clientRedis.get("provincia:listado");
  if (reply) return JSON.parse(reply);

  const provincias = await Provincia.findAll();
  if (provincias.length === 0) {
    throw new AppError("No se encontraron provincias creados", 404);
  }

  await clientRedis.set("provincia:listado", JSON.stringify(provincias), {
    EX: 3600,
  });

  return provincias;
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
