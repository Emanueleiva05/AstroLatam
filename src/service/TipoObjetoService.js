import TipoObjeto from "../models/TipoObjeto.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoObjeto = async (nombre, descripcion) => {
  return await TipoObjeto.create({ nombre, descripcion });
};

export const ModificarTipoObjeto = async (tipoObjeto, nombre, descripcion) => {
  tipoObjeto.nombre = nombre;
  tipoObjeto.descripcion = descripcion;
  return await tipoObjeto.save();
};

export const EliminarTipoObjeto = async (tipoObjeto) => {
  return await tipoObjeto.destroy();
};

export const ListarTipoObjetos = async () => {
  const reply = await clientRedis.get("tipoObjeto:listado");
  if (reply) return JSON.parse(reply);

  const tipoObjetos = await TipoObjeto.findAll();
  if (tipoObjetos.length === 0) {
    throw new AppError("No se encontraron tipoObjetos creados", 404);
  }

  await clientRedis.set("tipoObjeto:listado", JSON.stringify(tipoObjetos), {
    EX: 3600,
  });

  return tipoObjetos;
};

export const ListarTipoObjetoEspecifico = async (id) => {
  const reply = await clientRedis.get(`tipoObjeto:${id}`);
  if (reply) return JSON.parse(reply);

  const tipoObjeto = await TipoObjeto.findByPk(id);

  await clientRedis.set(`tipoObjeto:${id}`, JSON.stringify(tipoObjeto), {
    EX: 3600,
  });
  return tipoObjeto;
};
