import TipoEvento from "../models/TipoEvento.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoEvento = async (nombre) => {
  const nuevo = await TipoEvento.create({ nombre });
  await clientRedis.del("tipoEventos:listado");
  return nuevo;
};

export const ModificarTipoEvento = async (tipoEvento, nombre) => {
  await clientRedis.del("tipoEventos:listado");
  await clientRedis.del(`tipoEvento:${tipoEvento.idTipoEvento}`);
  tipoEvento.nombre = nombre;
  return await tipoEvento.save();
};

export const EliminarTipoEvento = async (tipoEvento) => {
  await clientRedis.del("tipoEventos:listado");
  await clientRedis.del(`tipoEvento:${tipoEvento.idTipoEvento}`);
  return await tipoEvento.destroy();
};

export const ListarTipoEventos = async () => {
  const reply = await clientRedis.get("tipoEventos:listado");
  if (reply) return JSON.parse(reply);

  const rows = await TipoEvento.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron tipoEventos creados", 404);
  }

  await clientRedis.set("tipoEventos:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const ListarTipoEventoEspecifico = async (id) => {
  const reply = await clientRedis.get(`tipoEvento:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoEvento = await TipoEvento.findByPk(id);

  await clientRedis.set(`tipoEvento:${id}`, JSON.stringify(tipoEvento), {
    EX: 3600,
  });

  return tipoEvento;
};
