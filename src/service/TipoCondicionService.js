import TipoCondicion from "../models/TipoCondicion.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoCondicion = async (nombre) => {
  return await TipoCondicion.create({ nombre });
};

export const ModificarTipoCondicion = async (tipoCondicion, nombre) => {
  tipoCondicion.nombre = nombre;
  return await tipoCondicion.save();
};

export const EliminarTipoCondicion = async (tipoCondicion) => {
  return await tipoCondicion.destroy();
};

export const ListarTipoCondiciones = async () => {
  const reply = await clientRedis.get(`tipoCondicion:listado`);
  if (reply) return JSON.parse(reply);

  const tipoCondiciones = await TipoCondicion.findAll();
  if (tipoCondiciones.length === 0) {
    throw new AppError("No se encontraron tipoCondiciones creados", 404);
  }

  await clientRedis.set(
    `tipoCondicion:listado`,
    JSON.stringify(tipoCondiciones),
    {
      EX: 3600,
    }
  );

  return tipoCondiciones;
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
