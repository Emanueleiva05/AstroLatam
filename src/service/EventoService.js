import Evento from "../models/Evento.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const AgregarEvento = async (
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  const nuevo = await Evento.create({
    nombre,
    horaInicio,
    descripcion,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  });

  await clientRedis.del("evento:listado:*");

  return nuevo;
};

export const ModificarEvento = async (
  evento,
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  await clientRedis.del("evento:listado:*");
  await clientRedis.del(`evento:${evento.idEvento}`);

  evento.nombre = nombre;
  evento.descripcion = descripcion;
  evento.horaInicio = horaInicio;
  evento.horaFin = horaFin;
  evento.fechaInicio = fechaInicio;
  evento.fechaFin = fechaFin;
  evento.idTipoEvento = idTipoEvento;
  return await evento.save();
};

export const EliminarEvento = async (evento) => {
  await clientRedis.del("evento:listado:*");
  await clientRedis.del(`evento:${evento.idEvento}`);
  return await evento.destroy();
};

export const ListarEventos = async (page, size) => {
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

export const ListarEvento = async (id) => {
  const reply = await clientRedis.get(`evento:${id}`);
  if (reply) return JSON.parse(reply);

  const evento = await Evento.findByPk(id);

  await clientRedis.set(`evento:${id}`, JSON.stringify(evento), { EX: 3600 });

  return evento;
};

export const AgregarAdjunto = async (evento, adjunto) => {
  return await evento.addAdjunto(adjunto);
};

export const EliminarAdjunto = async (evento, adjunto) => {
  return await evento.removeAdjunto(adjunto);
};

export const ListarAdjuntos = async (evento) => {
  const reply = await clientRedis.get("evento:adjunto:listado");
  if (reply) return JSON.parse(reply);

  const adjuntos = await evento.getAdjuntos();

  await clientRedis.set("evento:adjunto:listado", JSON.stringify(adjuntos), {
    EX: 3600,
  });

  return adjuntos;
};

export const ListarAdjuntosEspecificoEvento = async (evento, idAdjunto) => {
  return await evento.getAdjuntos({
    where: {
      idAdjunto: idAdjunto,
    },
  });
};

export const AgregarPais = async (evento, pais) => {
  return await evento.addPais(pais);
};

export const EliminarPais = async (evento, pais) => {
  return await evento.removePais(pais);
};

export const ListarPaises = async (evento) => {
  const paises = await evento.getPais();

  await clientRedis.set("evento:pais:listado", JSON.stringify(paises), {
    EX: 3600,
  });

  return paises;
};

export const ListarPaisesEspecificoEvento = async (evento, idPais) => {
  return await evento.getPais({
    where: {
      idPais: idPais,
    },
  });
};

export const AgregarObjeto = async (evento, objeto) => {
  return await evento.addObjeto(objeto);
};

export const EliminarObjeto = async (evento, objeto) => {
  return await evento.removeObjeto(objeto);
};

export const ListarObjetos = async (evento) => {
  const reply = await clientRedis.get("evento:objeto:listado");
  if (reply) return JSON.parse(reply);

  const objetos = await evento.getObjetos();

  await clientRedis.set("evento:objeto:listado", JSON.stringify(objetos), {
    EX: 3600,
  });
  return objetos;
};

export const ListarObjetoEspecificoEvento = async (evento, idObjeto) => {
  return await evento.getObjetos({
    where: {
      idObjeto: idObjeto,
    },
  });
};
