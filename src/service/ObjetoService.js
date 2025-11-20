import Objeto from "../models/Objeto.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";
import { where } from "sequelize";

export const createObject = async (nombre, descripcion, idTipoObjeto) => {
  const nuevo = await Objeto.create({
    nombre,
    descripcion,
    idTipoObjeto,
  });
  await clientRedis.del("objeto:listado");
  return nuevo;
};

export const updateObject = async (
  objeto,
  nombre,
  descripcion,
  idTipoObjeto
) => {
  await clientRedis.del("objeto:listado");
  await clientRedis.del(`objeto:${objeto.idObjeto}`);

  objeto.nombre = nombre;
  objeto.descripcion = descripcion;
  objeto.idTipoObjeto = idTipoObjeto;
  return await objeto.save();
};

export const deleteObject = async (objeto) => {
  await clientRedis.del("objeto:listado");
  await clientRedis.del(`objeto:${objeto.idObjeto}`);
  return await objeto.destroy();
};

export const getObjects = async (page, size) => {
  const reply = await clientRedis.get("objeto:listado");
  if (reply) return JSON.parse(reply);

  const rows = await Objeto.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron objetos creados", 404);
  }

  await clientRedis.set("objeto:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const getObjectById = async (id) => {
  const reply = await clientRedis.get(`objeto:${id}`);
  if (reply) return JSON.parse(reply);

  const objeto = await Objeto.findByPk(id);

  await clientRedis.set(`objeto:${id}`, JSON.stringify(objeto), { EX: 3600 });

  return objeto;
};

export const addObjectAttachment = async (objeto, adjunto) => {
  return await objeto.addAdjunto(adjunto);
};

export const removeObjectAttachment = async (objeto, adjunto) => {
  return await objeto.removeAdjunto(adjunto);
};

export const getObjectAttachments = async (objeto) => {
  const reply = await clientRedis.get(
    `objeto:${objeto.idObjeto}:adjunto:listado`
  );
  if (reply) return JSON.parse(reply);

  const adjuntos = await objeto.getAdjuntos();

  await clientRedis.set(
    `objeto:${objeto.idObjeto}:adjunto:listado`,
    JSON.stringify(adjuntos),
    {
      EX: 3600,
    }
  );

  return adjuntos;
};

export const getObjectAttachmentById = async (objeto, idAdjunto) => {
  const reply = await clientRedis.get(
    `objeto:${objeto.idObjeto}:adjunto:${idAdjunto}`
  );
  if (reply) return JSON.parse(reply);
  const adjunto = await objeto.getAdjuntos({ where: { idAdjunto } });
  await clientRedis.set(
    `objeto:${objeto.idObjeto}:adjunto:${idAdjunto}`,
    JSON.stringify(adjunto),
    {
      EX: 3600,
    }
  );

  return adjunto[0];
};
