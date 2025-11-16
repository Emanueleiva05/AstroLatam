import Evento from "../models/Evento.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const createEvent = async (
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  const newEvent = await Evento.create({
    nombre,
    horaInicio,
    descripcion,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  });

  await clientRedis.del("evento:listado:*");

  return newEvent;
};

export const updateEvent = async (
  event,
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  await clientRedis.del("evento:listado:*");
  await clientRedis.del(`evento:${event.idEvento}`);

  event.nombre = nombre;
  event.descripcion = descripcion;
  event.horaInicio = horaInicio;
  event.horaFin = horaFin;
  event.fechaInicio = fechaInicio;
  event.fechaFin = fechaFin;
  event.idTipoEvento = idTipoEvento;
  return await event.save();
};

export const deleteEvent = async (evento) => {
  await clientRedis.del("evento:listado:*");
  await clientRedis.del(`evento:${evento.idEvento}`);
  return await evento.destroy();
};

export const getEvents = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const reply = await clientRedis.get(
    `evento:listado:page=${page}:size=${size}`
  );
  if (reply) return JSON.parse(reply);

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Evento.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron eventos creados", 404);
  }

  const response = {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };

  await clientRedis.set(
    `evento:listado:page=${page}:size=${size}`,
    JSON.stringify(response),
    {
      EX: 3600,
    }
  );

  return response;
};

export const getEventById = async (id) => {
  const reply = await clientRedis.get(`evento:${id}`);
  if (reply) return JSON.parse(reply);

  const evento = await Evento.findByPk(id);

  await clientRedis.set(`evento:${id}`, JSON.stringify(evento), { EX: 3600 });

  return evento;
};

export const addAttachment = async (evento, adjunto) => {
  return await evento.addAdjunto(adjunto);
};

export const removeAttachment = async (evento, adjunto) => {
  return await evento.removeAdjunto(adjunto);
};

export const getAttachments = async (evento) => {
  const reply = await clientRedis.get("evento:adjunto:listado");
  if (reply) return JSON.parse(reply);

  const adjuntos = await evento.getAdjuntos();

  await clientRedis.set("evento:adjunto:listado", JSON.stringify(adjuntos), {
    EX: 3600,
  });

  return adjuntos;
};

export const getEventAttachment = async (evento, idAdjunto) => {
  return await evento.getAdjuntos({
    where: {
      idAdjunto: idAdjunto,
    },
  });
};

export const addCountry = async (evento, pais) => {
  return await evento.addPais(pais);
};

export const removeCountry = async (evento, pais) => {
  return await evento.removePais(pais);
};

export const getCountries = async (evento) => {
  const reply = await clientRedis.get("evento:pais:listado");
  if (reply) return JSON.parse(reply);

  const paises = await evento.getPais();

  await clientRedis.set("evento:pais:listado", JSON.stringify(paises), {
    EX: 3600,
  });

  return paises;
};

export const getEventCountry = async (evento, idPais) => {
  return await evento.getPais({
    where: {
      idPais: idPais,
    },
  });
};

export const addObject = async (evento, objeto) => {
  return await evento.addObjeto(objeto);
};

export const removeObject = async (evento, objeto) => {
  return await evento.removeObjeto(objeto);
};

export const getObjects = async (evento) => {
  const reply = await clientRedis.get("evento:objeto:listado");
  if (reply) return JSON.parse(reply);

  const objetos = await evento.getObjetos();

  await clientRedis.set("evento:objeto:listado", JSON.stringify(objetos), {
    EX: 3600,
  });
  return objetos;
};

export const getEventObject = async (evento, idObjeto) => {
  return await evento.getObjetos({
    where: {
      idObjeto: idObjeto,
    },
  });
};
