import TipoObjeto from "../models/TipoObjeto.js";
import clientRedis from "../settings/redis.js";
import AppError from "../utils/AppError.js";

export const AgregarTipoObjeto = async (nombre, descripcion) => {
  const nuevo = await TipoObjeto.create({ nombre, descripcion });

  await clientRedis.del("tipoObjeto:listado");

  return nuevo;
};

export const ModificarTipoObjeto = async (tipoObjeto, nombre, descripcion) => {
  await clientRedis.del("tipoObjeto:listado");
  await clientRedis.del(`tipoObjeto:${tipoObjeto.idTipoObjeto}`);
  tipoObjeto.nombre = nombre;
  tipoObjeto.descripcion = descripcion;

  return await tipoObjeto.save();
};

export const EliminarTipoObjeto = async (tipoObjeto) => {
  await clientRedis.del("tipoObjeto:listado");
  await clientRedis.del(`tipoObjeto:${tipoObjeto.idTipoObjeto}`);

  return await tipoObjeto.destroy();
};

export const ListarTipoObjetos = async (page, size) => {
  const reply = await clientRedis.get("tipoObjeto:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const tipoObjetos = await TipoObjeto.findAll(options);
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
