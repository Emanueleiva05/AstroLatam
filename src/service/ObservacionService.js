import Observacion from "../models/Observacion.js";
import AppError from "../utils/AppError.js";

export const AgregarObservacion = async (
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  return await Observacion.create({
    titulo,
    horaObservacion,
    descripcion,
    fechaObservacion,
    idUbicacion,
  });
};

export const ModificarObservacion = async (
  observacion,
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  observacion.titulo = titulo;
  observacion.descripcion = descripcion;
  observacion.horaObservacion = horaObservacion;
  observacion.fechaObservacion = fechaObservacion;
  observacion.idUbicacion = idUbicacion;
  return await observacion.save();
};

export const EliminarObservacion = async (observacion) => {
  return await observacion.destroy();
};

export const ListarObservaciones = async (id) => {
  const observaciones = await Observacion.findAll({
    where: { idUbicacion: id },
  });
  if (observaciones.length === 0) {
    throw new AppError("No se encontraron observacion creados", 404);
  }
  return observaciones;
};

export const ListarObservacionEspecifico = async (id) => {
  const observacion = await Observacion.findByPk(id);
  return observacion;
};

export const AgregarAdjunto = async (observacion, adjunto) => {
  await observacion.addAdjunto(adjunto);
};

export const EliminarAdjunto = async (observacion, adjunto) => {
  await observacion.removeAdjunto(adjunto);
};

export const AgregarEvento = async (observacion, evento) => {
  await observacion.addEvento(evento);
};

export const EliminarEvento = async (observacion, evento) => {
  await observacion.removeEvento(evento);
};

export const AgregarInstrumento = async (observacion, instrumento) => {
  await observacion.addInstrumento(instrumento);
};

export const EliminarInstrumento = async (observacion, instrumento) => {
  await observacion.removeInstrumento(instrumento);
};

export const AgregarObjeto = async (observacion, objeto) => {
  await observacion.addObjeto(objeto);
};

export const EliminarObjeto = async (observacion, objeto) => {
  await observacion.removeObjeto(objeto);
};

export const ListarAdjuntos = async (observacion) => {
  return await observacion.getAdjuntos();
};

export const ListarAdjuntosEspecificoObservacion = async (
  observacion,
  idAdjunto
) => {
  return await observacion.getAdjuntos({
    where: {
      idAdjunto: idAdjunto,
    },
  });
};

export const ListarInstrumentos = async (observacion) => {
  return await observacion.getInstrumentos();
};

export const ListarInstrumentoEspecificoObservacion = async (
  observacion,
  idInstrumento
) => {
  return await observacion.getInstrumentos({
    where: {
      idInstrumento: idInstrumento,
    },
  });
};

export const ListarEventos = async (observacion) => {
  return await observacion.getEventos();
};

export const ListarEventoEspecificoObservacion = async (
  observacion,
  idEvento
) => {
  return await observacion.getEventos({
    where: {
      idEvento: idEvento,
    },
  });
};

export const ListarObjetos = async (observacion) => {
  return await observacion.getObjetos();
};

export const ListarObjetosEspecificoObservacion = async (
  observacion,
  idObjeto
) => {
  return await observacion.getObjetos({
    where: {
      idObjeto: idObjeto,
    },
  });
};

export const VisibilidadObservacion = async (observacion, estado) => {
  observacion.visibilidad = estado;
  return await observacion.save();
};
