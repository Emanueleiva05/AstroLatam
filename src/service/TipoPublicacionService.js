import TipoPublicacion from "../models/TipoPublicacion.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoPublicacion = async (nombre, descripcion) => {
  const nuevo = await TipoPublicacion.create({
    nombre,
    descripcion,
  });

  await clientRedis.del("tipoPublicacion:listado");

  return nuevo;
};

export const ModificarTipoPublicacion = async (
  tipoPublicacion,
  nombre,
  descripcion
) => {
  await clientRedis.del("tipoPublicacion:listado");
  await clientRedis.del(`tipoPublicacion:${tipoPublicacion.idTipoPublicacion}`);

  tipoPublicacion.nombre = nombre;
  tipoPublicacion.descripcion = descripcion;

  return await tipoPublicacion.save();
};

export const EliminarTipoPublicacion = async (tipoPublicacion) => {
  await clientRedis.del("tipoPublicacion:listado");
  await clientRedis.del(`tipoPublicacion:${tipoPublicacion.idTipoPublicacion}`);

  return await tipoPublicacion.destroy();
};

export const ListarTipoPublicaciones = async () => {
  const reply = await clientRedis.get("tipoPublicacion:listado");
  if (reply) return JSON.parse(reply);

  const rows = await TipoPublicacion.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoPublicaciones creados", 404);
  }

  await clientRedis.set("tipoPublicacion:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const ListarTipoPublicacionEspecifico = async (id) => {
  const reply = await clientRedis.get(`tipoPublicacion:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoPublicacion = await TipoPublicacion.findByPk(id);

  await clientRedis.set(
    `tipoPublicacion:${id}`,
    JSON.stringify(tipoPublicacion),
    { EX: 3600 }
  );

  return tipoPublicacion;
};
