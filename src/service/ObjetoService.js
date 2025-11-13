import Objeto from "../models/Objeto.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarObjeto = async (nombre, descripcion, idTipoObjeto) => {
  const nuevo = await Objeto.create({
    nombre,
    descripcion,
    idTipoObjeto,
  });
  await clientRedis.del("objeto:listado");
  return nuevo;
};

export const ModificarObjeto = async (
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

export const EliminarObjeto = async (objeto) => {
  await clientRedis.del("objeto:listado");
  await clientRedis.del(`objeto:${objeto.idObjeto}`);
  return await objeto.destroy();
};

export const ListarObjetos = async (page, size) => {
  const reply = await clientRedis.get("objeto:listado");
  if (reply) return JSON.parse(reply);

  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const objetos = await Objeto.findAll(options);
  if (objetos.length === 0) {
    throw new AppError("No se encontraron objetos creados", 404);
  }

  await clientRedis.set("objeto:listado", JSON.stringify(objetos), {
    EX: 3600,
  });

  return objetos;
};

export const ListarObjetoEspecifico = async (id) => {
  const reply = await clientRedis.get(`objeto:${id}`);
  if (reply) return JSON.parse(reply);

  const objeto = await Objeto.findByPk(id);

  await clientRedis.set(`objeto:${id}`, JSON.stringify(objeto), { EX: 3600 });

  return objeto;
};

export const AgregarAdjunto = async (objeto, adjunto) => {
  return await objeto.addAdjunto(adjunto);
};

export const EliminarAdjunto = async (objeto, adjunto) => {
  return await objeto.removeAdjunto(adjunto);
};

export const ListarAdjuntos = async (objeto) => {
  const reply = await clientRedis.get(`objeto:adjunto:listado`);
  if (reply) return JSON.parse(reply);

  const adjuntos = await objeto.getAdjuntos();

  await clientRedis.set(`objeto:adjunto:listado`, JSON.stringify(adjuntos), {
    EX: 3600,
  });

  return adjuntos;
};

export const ListarAdjuntosEspecificoObjeto = async (objeto, idAdjunto) => {
  const reply = await clientRedis.get(`objeto:adjunto:${idAdjunto}`);
  if (reply) return JSON.parse(reply);

  const adjunto = await objeto.getAdjuntos({
    where: {
      idAdjunto: idAdjunto,
    },
  });
  await clientRedis.set(
    `objeto:adjunto:${idAdjunto}`,
    JSON.stringify(adjunto),
    {
      EX: 3600,
    }
  );

  return adjunto;
};
