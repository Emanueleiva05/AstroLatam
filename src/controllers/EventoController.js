import {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvents,
  addAttachment,
  removeAttachment,
  addObject,
  removeObject,
  addCountry,
  removeCountry,
  getAttachments,
  getCountries,
  getObjects,
} from "../service/EventoService.js";

export const createEventHandler = async (req, res, next) => {
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;
  try {
    await createEvent(
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(201).json({ message: "Evento creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateEventHandler = async (req, res, next) => {
  const evento = req.evento;
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;

  try {
    await updateEvent(
      evento,
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(204).json({ message: "Evento modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteEventHandler = async (req, res, next) => {
  const evento = req.evento;
  try {
    await deleteEvent(evento);
    res.status(204).json({ message: "Evento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getEventsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const eventos = await getEvents(page, size);
    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
};

export const getEventHandler = async (req, res, next) => {
  const evento = req.evento;
  try {
    const eve = evento;
    res.status(200).json(eve);
  } catch (error) {
    next(error);
  }
};

export const addAttachmentHandler = async (req, res, next) => {
  try {
    await addAttachment(req.evento, req.adjunto);
    res.status(201).json({ message: "Se agrego el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const removeAttachmentHandler = async (req, res, next) => {
  try {
    await removeAttachment(req.evento, req.adjunto);
    res.status(204).json({ message: "Se elimino el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const addCountryHandler = async (req, res, next) => {
  try {
    await addCountry(req.evento, req.pais);
    res.status(201).json({ message: "Se agrego el pais con exito" });
  } catch (error) {
    next(error);
  }
};

export const removeCountryHandler = async (req, res, next) => {
  try {
    await removeCountry(req.evento, req.pais);
    res.status(204).json({ message: "Se elimino el pais con exito" });
  } catch (error) {
    next(error);
  }
};

export const addObjectHandler = async (req, res, next) => {
  try {
    await addObject(req.evento, req.objeto);
    res.status(201).json({ message: "Se agrego el objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const removeObjectHandler = async (req, res, next) => {
  try {
    await removeObject(req.evento, req.objeto);
    res.status(204).json({ message: "Se elimino el objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const getAttachmentsHandler = async (req, res, next) => {
  try {
    const adjuntos = await getAttachments(req.evento);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const getAttachmentHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.adjunto);
  } catch (error) {
    next(error);
  }
};

export const getCountriesHandler = async (req, res, next) => {
  try {
    const paises = await getCountries(req.evento);
    res.status(200).json(paises);
  } catch (error) {
    next(error);
  }
};

export const getCountryHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.pais);
  } catch (error) {
    next(error);
  }
};

export const getObjectsHandler = async (req, res, next) => {
  try {
    const objetos = await getObjects(req.evento);
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const getObjectHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.objeto);
  } catch (error) {
    next(error);
  }
};
