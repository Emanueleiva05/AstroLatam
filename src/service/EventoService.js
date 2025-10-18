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

export const AgregarPais = async (evento, pais) => {
  return await evento.addPais(pais);
};

export const EliminarPais = async (evento, pais) => {
  return await evento.removePais(pais);
};

export const AgregarObjeto = async (evento, objeto) => {
  return await evento.addObjeto(objeto);
};

export const EliminarObjeto = async (evento, objeto) => {
  return await evento.removeObjeto(objeto);
};
