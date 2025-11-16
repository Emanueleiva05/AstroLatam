import Observacion from "../models/Observacion.js";
import Usuario from "../models/Usuario.js";
import Instrumento from "../models/Instrumento.js";
import Ciudad from "../models/Ciudad.js";
import Pais from "../models/Pais.js";
import Provincia from "../models/Provincia.js";
import AppError from "../utils/AppError.js";
import Ubicacion from "../models/Ubicacion.js";

export const createObservation = async (
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion,
  idUsuario
) => {
  return await Observacion.create({
    titulo,
    horaObservacion,
    descripcion,
    fechaObservacion,
    idUbicacion,
    idUsuario,
  });
};

export const updateObservation = async (
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

export const deleteObservation = async (observacion) => {
  return await observacion.destroy();
};

export const getObservations = async (id) => {
  const observaciones = await Observacion.findAll({
    where: { idUbicacion: id },
  });
  if (observaciones.length === 0) {
    throw new AppError("No se encontraron observacion creados", 404);
  }
  return observaciones;
};

export const getObservationById = async (id) => {
  const observacion = await Observacion.findByPk(id);
  return observacion;
};

export const addObservationAttachment = async (observacion, adjunto) => {
  await observacion.addAdjunto(adjunto);
};

export const removeObservationAttachment = async (observacion, adjunto) => {
  await observacion.removeAdjunto(adjunto);
};

export const addObservationEvent = async (observacion, evento) => {
  await observacion.addEvento(evento);
};

export const removeObservationEvent = async (observacion, evento) => {
  await observacion.removeEvento(evento);
};

export const addObservationInstrument = async (observacion, instrumento) => {
  await observacion.addInstrumento(instrumento);
};

export const removeObservationInstrument = async (observacion, instrumento) => {
  await observacion.removeInstrumento(instrumento);
};

export const addObservationObject = async (observacion, objeto) => {
  await observacion.addObjeto(objeto);
};

export const removeObservationObject = async (observacion, objeto) => {
  await observacion.removeObjeto(objeto);
};

export const getObservationAttachments = async (observacion) => {
  return await observacion.getAdjuntos();
};

export const getObservationAttachmentById = async (observacion, idAdjunto) => {
  return await observacion.getAdjuntos({
    where: {
      idAdjunto: idAdjunto,
    },
  });
};

export const getObservationInstruments = async (observacion) => {
  return await observacion.getInstrumentos();
};

export const getObservationInstrumentById = async (
  observacion,
  idInstrumento
) => {
  return await observacion.getInstrumentos({
    where: {
      idInstrumento: idInstrumento,
    },
  });
};

export const getObservationEvents = async (observacion) => {
  return await observacion.getEventos();
};

export const getObservationEventById = async (observacion, idEvento) => {
  return await observacion.getEventos({
    where: {
      idEvento: idEvento,
    },
  });
};

export const getObservationObjects = async (observacion) => {
  return await observacion.getObjetos();
};

export const getObservationObjectById = async (observacion, idObjeto) => {
  return await observacion.getObjetos({
    where: {
      idObjeto: idObjeto,
    },
  });
};

export const updateObservationVisibility = async (observacion, estado) => {
  observacion.visibilidad = estado;
  return await observacion.save();
};

export const filterObservations = async (
  pais,
  provincia,
  ciudad,
  instrumento,
  rol
) => {
  const observaciones = await Observacion.findAll({
    include: [
      {
        model: Usuario,
        ...(rol ? { where: { rol }, required: true } : {}),
        attributes: [],
      },
      {
        model: Ubicacion,
        attributes: [],
        required: !!(pais || provincia || ciudad),
        include: [
          {
            model: Ciudad,
            ...(ciudad ? { where: { nombre: ciudad }, required: true } : {}),
            attributes: [],
            include: [
              {
                model: Provincia,
                ...(provincia
                  ? { where: { nombre: provincia }, required: true }
                  : {}),
                include: [
                  {
                    model: Pais,
                    ...(pais
                      ? { where: { nombre: pais }, required: true }
                      : {}),
                  },
                ],
                attributes: [],
              },
            ],
          },
        ],
      },
      {
        model: Instrumento,
        through: { attributes: [] },
        attributes: [],
        ...(instrumento
          ? { where: { nombre: instrumento }, required: true }
          : {}),
      },
    ],
  });
  return observaciones;
};
