import TipoInstrumento from "../models/TipoInstrumento.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoInstrumento = async (nombre, descripcion) => {
  const nuevo = await TipoInstrumento.create({
    nombre,
    descripcion,
  });

  await clientRedis.del("tipoInstrumento:listado");

  return nuevo;
};

export const ModificarTipoInstrumento = async (
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

export const EliminarTipoInstrumento = async (tipoInstrumento) => {
  await clientRedis.del("tipoInstrumento:listado");
  await clientRedis.del(`tipoInstrumento:${tipoInstrumento.idTipoInstrumento}`);
  return await tipoInstrumento.destroy();
};

export const ListarTipoInstrumentos = async (page, size) => {
  const reply = await clientRedis.get("tipoInstrumento:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const tipoInstrumentos = await TipoInstrumento.findAll(options);
  if (tipoInstrumentos.length === 0) {
    throw new AppError("No se encontraron tipoEventos creados", 404);
  }

  await clientRedis.set(
    "tipoInstrumento:listado",
    JSON.stringify(tipoInstrumentos),
    { EX: 3600 }
  );

  return tipoInstrumentos;
};

export const ListarTipoInstrumentoEspecifico = async (id) => {
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
