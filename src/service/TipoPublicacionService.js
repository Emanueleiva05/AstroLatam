import TipoPublicacion from "../models/TipoPublicacion.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoPublicacion = async (nombre, descripcion) => {
  return await TipoPublicacion.create({
    nombre,
    descripcion,
  });
};

export const ModificarTipoPublicacion = async (
  tipoPublicacion,
  nombre,
  descripcion
) => {
  tipoPublicacion.nombre = nombre;
  tipoPublicacion.descripcion = descripcion;
  return await tipoPublicacion.save();
};

export const EliminarTipoPublicacion = async (tipoPublicacion) => {
  return await tipoPublicacion.destroy();
};

export const ListarTipoPublicaciones = async () => {
  const reply = await clientRedis.get("tipoPublicacion:listado");
  if (reply) return JSON.parse(reply);

  const tipoPublicaciones = await TipoPublicacion.findAll();
  if (tipoPublicaciones.length === 0) {
    throw new AppError("No se encontraron tipoPublicaciones creados", 404);
  }

  await clientRedis.set(
    "tipoPublicacion:listado",
    JSON.stringify(tipoPublicaciones),
    { EX: 3600 }
  );
  return tipoPublicaciones;
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
