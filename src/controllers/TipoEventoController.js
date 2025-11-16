import {
  createEventType,
  getEventTypes,
  updateEventType,
  deleteEventType,
} from "../service/TipoEventoService.js";

export const createEventTypeHandler = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await createEventType(nombre);
    res.status(201).json({
      message: "Se agrego el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateEventTypeHandler = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoEvento = req.evento;
  try {
    await updateEventType(tipoEvento, nombre);
    res.status(204).json({
      message: "Se modifico el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventTypeHandler = async (req, res, next) => {
  const tipoEvento = req.evento;
  try {
    await deleteEventType(tipoEvento);
    res.status(204).json({
      message: "Se elimino el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getEventTypesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tiposEventos = await getEventTypes(page, size);
    res.status(200).json(tiposEventos);
  } catch (error) {
    next(error);
  }
};

export const getEventTypeHandler = async (req, res, next) => {
  const tipoEvento = req.evento;
  try {
    const TipoE = tipoEvento;
    res.status(200).json(TipoE);
  } catch (error) {
    next(error);
  }
};
