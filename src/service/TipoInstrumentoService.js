import TipoInstrumento from "../models/TipoInstrumento.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const createInstrumentType = async (nombre, descripcion) => {
  const nuevo = await TipoInstrumento.create({
    nombre,
    descripcion,
  });

  await clientRedis.del("tipoInstrumento:listado");

  return nuevo;
};

export const updateInstrumentType = async (
  tipoInstrumento,
  nombre,
  descripcion
) => {
  await clientRedis.del("tipoInstrumento:listado");
  await clientRedis.del(`tipoInstrumento:${tipoInstrumento.idTipoInstrumento}`);
  tipoInstrumento.nombre = nombre;
  tipoInstrumento.descripcion = descripcion;

  return await tipoInstrumento.save();
};

export const deleteInstrumentType = async (tipoInstrumento) => {
  await clientRedis.del("tipoInstrumento:listado");
  await clientRedis.del(`tipoInstrumento:${tipoInstrumento.idTipoInstrumento}`);
  return await tipoInstrumento.destroy();
};

export const getInstrumentTypes = async () => {
  const reply = await clientRedis.get("tipoInstrumento:listado");
  if (reply) return JSON.parse(reply);

  const rows = await TipoInstrumento.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoEventos creados", 404);
  }

  await clientRedis.set("tipoInstrumento:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const getInstrumentTypeById = async (id) => {
  const reply = await clientRedis.get(`tipoInstrumento:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoInstrumento = await TipoInstrumento.findByPk(id);

  await clientRedis.set(
    `tipoInstrumento:${id}`,
    JSON.stringify(tipoInstrumento),
    { EX: 3600 }
  );
  return tipoInstrumento;
};
