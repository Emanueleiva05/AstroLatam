import Ciudad from "../models/Ciudad.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarCiudad = async (nombre, idProvincia) => {
  const nuevo = await Ciudad.create({ nombre, idProvincia });
  await clientRedis.del("ciudad:listado");
  return nuevo;
};

export const ModificarCiudad = async (ciudad, nombre) => {
  await clientRedis.del("ciudad:listado");
  await clientRedis.del(`ciudad:${ciudad.idCiudad}`);
  ciudad.nombre = nombre;
  return await ciudad.save();
};

export const EliminarCiudad = async (ciudad) => {
  await clientRedis.del("ciudad:listado");
  await clientRedis.del(`ciudad:${ciudad.idCiudad}`);
  return await ciudad.destroy();
};

export const ListarCiudades = async () => {
  const reply = await clientRedis.get("ciudad:listado");
  if (reply) return JSON.parse(reply);

  const rows = await Ciudad.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron ciudades creadas", 404);
  }

  await clientRedis.set("ciudad:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const ListarCiudadEspecifico = async (id) => {
  const reply = await clientRedis.get(`ciudad:${id}`);

  if (reply) return JSON.parse(reply);

  const ciudad = await Ciudad.findByPk(id);

  await clientRedis.set(`:ciudad:${id}`, JSON.stringify(ciudad), { EX: 3600 });

  return ciudad;
};
