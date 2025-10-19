import Evento from "../models/Evento.js";
import AppError from "../utils/AppError.js";

export const AgregarEvento = async (
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  return await Evento.create({
    nombre,
    horaInicio,
    descripcion,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  });
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
  return await evento.destroy();
};

export const ListarEventos = async () => {
  const eventos = await Evento.findAll();
  if (eventos.length === 0) {
    throw new AppError("No se encontraron eventos creados", 404);
  }
  return eventos;
};

export const ListarEvento = async (id) => {
  const evento = await Evento.findByPk(id);
  return evento;
};

export const AgregarAdjunto = async (evento, adjunto) => {
  return await evento.addAdjunto(adjunto);
};

export const EliminarAdjunto = async (evento, adjunto) => {
  return await evento.removeAdjunto(adjunto);
};

export const ListarAdjuntos = async (evento) => {
  return await evento.getAdjuntos();
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
  return await evento.getPais();
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
  return await evento.getObjetos();
};

export const ListarObjetoEspecificoEvento = async (evento, idObjeto) => {
  return await evento.getObjetos({
    where: {
      idObjeto: idObjeto,
    },
  });
};
