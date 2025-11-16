import {
  createInstrument,
  getInstruments,
  deleteInstrument,
  updateInstrument,
} from "../service/InstrumentoService.js";

export const createInstrumentHandler = async (req, res, next) => {
  const {
    nombre,
    descripcion,
    apertura,
    distancia_focal,
    tipo_telescopio,
    aumento,
    diametro,
    tipo_prisma,
    idTipoInstrumento,
  } = req.body;
  try {
    await createInstrument(
      nombre,
      descripcion,
      apertura,
      distancia_focal,
      tipo_telescopio,
      aumento,
      diametro,
      tipo_prisma,
      idTipoInstrumento
    );
    res.status(201).json({ message: "Instrumento creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateInstrumentHandler = async (req, res, next) => {
  const instrumento = req.instrumento;
  const {
    nombre,
    descripcion,
    apertura,
    distancia_focal,
    tipo_telescopio,
    aumento,
    diametro,
    tipo_prisma,
    idTipoInstrumento,
  } = req.body;

  try {
    await updateInstrument(
      instrumento,
      nombre,
      descripcion,
      apertura,
      distancia_focal,
      tipo_telescopio,
      aumento,
      diametro,
      tipo_prisma,
      idTipoInstrumento
    );
    res.status(204).json({ message: "Instrumento modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteInstrumentHandler = async (req, res, next) => {
  const instrumento = req.instrumento;
  try {
    await deleteInstrument(instrumento);
    res.status(204).json({ message: "Instrumento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getInstrumentsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const instrumentos = await getInstruments(page, size);
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const getInstrumentHandler = async (req, res, next) => {
  const instrumento = req.instrumento;
  try {
    const ins = instrumento;
    res.status(200).json(ins);
  } catch (error) {
    next(error);
  }
};
