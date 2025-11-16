import {
  createObservation,
  deleteObservation,
  updateObservation,
  addObservationAttachment,
  addObservationEvent,
  addObservationInstrument,
  addObservationObject,
  removeObservationAttachment,
  removeObservationEvent,
  removeObservationInstrument,
  removeObservationObject,
  getObservationAttachments,
  getObservationEvents,
  getObservationObjects,
  getObservationInstruments,
  updateObservationVisibility,
  filterObservations,
} from "../service/ObservacionService.js";
import AppError from "../utils/AppError.js";

export const createObservationHandler = async (req, res, next) => {
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
    idUsuario,
  } = req.body;
  try {
    await createObservation(
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion,
      idUsuario
    );
    res.status(201).json({ message: "Observacion creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateObservationHandler = async (req, res, next) => {
  const observacion = req.observacion;
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;

  try {
    await updateObservation(
      observacion,
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion
    );
    res.status(204).json({ message: "Observacion modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteObservationHandler = async (req, res, next) => {
  const observacion = req.observacion;
  try {
    await deleteObservation(observacion);
    res.status(204).json({ message: "Observacion eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getObservationsHandler = async (req, res, next) => {
  const { pais, provincia, ciudad, instrumento, rol } = req.query;
  try {
    const observaciones = await filterObservations(
      pais,
      provincia,
      ciudad,
      instrumento,
      rol
    );

    if (observaciones.length === 0) {
      throw new AppError("No se encontraron observaciones", 404);
    }

    res.status(200).json(observaciones);
  } catch (error) {
    next(error);
  }
};

export const getObservationHandler = async (req, res, next) => {
  const observacion = req.observacion;
  try {
    const obs = observacion;
    res.status(200).json(obs);
  } catch (error) {
    next(error);
  }
};

export const addObservationAttachmentHandler = async (req, res, next) => {
  try {
    await addObservationAttachment(req.observacion, req.adjunto);
    res.status(201).json({ message: "Se agrego un adjunto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const removeObservationAttachmentHandler = async (req, res, next) => {
  try {
    await removeObservationAttachment(req.observacion, req.adjunto);
    res
      .status(204)
      .json({ message: "Se elimino un adjunto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const addObservationEventHandler = async (req, res, next) => {
  try {
    await addObservationEvent(req.observacion, req.evento);
    res.status(201).json({ message: "Se agrego un evento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const removeObservationEventHandler = async (req, res, next) => {
  try {
    await removeObservationEvent(req.observacion, req.evento);
    res.status(204).json({ message: "Se elimino un evento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const addObservationObjectHandler = async (req, res, next) => {
  try {
    await addObservationObject(req.observacion, req.objeto);
    res.status(201).json({ message: "Se agrego un objeto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const removeObservationObjectHandler = async (req, res, next) => {
  try {
    await removeObservationObject(req.observacion, req.objeto);
    res.status(204).json({ message: "Se elimino un objeto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const addObservationInstrumentHandler = async (req, res, next) => {
  try {
    await addObservationInstrument(req.observacion, req.instrumento);
    res
      .status(201)
      .json({ message: "Se agrego un instrumento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const removeObservationInstrumentHandler = async (req, res, next) => {
  try {
    await removeObservationInstrument(req.observacion, req.instrumento);
    res
      .status(204)
      .json({ message: "Se elimino un instrumento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const getObservationAttachmentsHandler = async (req, res, next) => {
  try {
    const adjuntos = await getObservationAttachments(req.observacion);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const getObservationAttachmentHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.adjunto);
  } catch (error) {
    next(error);
  }
};

export const getObservationObjectsHandler = async (req, res, next) => {
  try {
    const objetos = await getObservationObjects(req.observacion);
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const getObservationObjectHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.objeto);
  } catch (error) {
    next(error);
  }
};

export const getObservationInstrumentsHandler = async (req, res, next) => {
  try {
    const instrumentos = await getObservationInstruments(req.observacion);
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const getObservationInstrumentHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.instrumento);
  } catch (error) {
    next(error);
  }
};

export const getObservationEventsHandler = async (req, res, next) => {
  try {
    const eventos = await getObservationEvents(req.observacion);
    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
};

export const getObservationEventHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.evento);
  } catch (error) {
    next(error);
  }
};

export const updateObservationVisibilityHandler = async (req, res, next) => {
  try {
    await updateObservationVisibility(req.observacion, req.visibilidad);
    res.status(204).json({ meesage: "Se cambio el visibilidad con exito" });
  } catch (error) {
    next(error);
  }
};
