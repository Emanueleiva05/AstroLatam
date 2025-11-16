import {
  createInstrumentType,
  updateInstrumentType,
  deleteInstrumentType,
  getInstrumentTypes,
} from "../service/TipoInstrumentoService.js";

export const createInstrumentTypeHandler = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await createInstrumentType(nombre, descripcion);
    res.status(201).json({ message: "Se creo el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateInstrumentTypeHandler = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  const { nombre, descripcion } = req.body;
  try {
    await updateInstrumentType(tipoInstrumento, nombre, descripcion);
    res
      .status(204)
      .json({ message: "Se modifico el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteInstrumentTypeHandler = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  try {
    await deleteInstrumentType(tipoInstrumento);
    res
      .status(204)
      .json({ message: "Se elimino el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const getInstrumentTypeHandler = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  try {
    const tipoIn = tipoInstrumento;
    res.status(200).json(tipoIn);
  } catch (error) {
    next(error);
  }
};

export const getInstrumentTypesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tipoPublicaciones = await getInstrumentTypes(page, size);
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    next(error);
  }
};
