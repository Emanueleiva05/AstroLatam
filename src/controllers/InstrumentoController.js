import {
  AgregarInstrumento,
  ListarInstrumentos,
  EliminarInstrumento,
  ModificarInstrumento,
} from "../service/InstrumentoService.js";

export const SetInstrumento = async (req, res, next) => {
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
    await AgregarInstrumento(
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

export const UpdateInstrumento = async (req, res, next) => {
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
    await ModificarInstrumento(
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

export const DeleteInstrumento = async (req, res, next) => {
  const instrumento = req.instrumento;
  try {
    await EliminarInstrumento(instrumento);
    res.status(204).json({ message: "Instrumento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumento = async (req, res, next) => {
  try {
    const instrumentos = await ListarInstrumentos();
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumentoEspecifico = async (req, res, next) => {
  const instrumento = req.instrumento;
  try {
    const ins = instrumento;
    res.status(200).json(ins);
  } catch (error) {
    next(error);
  }
};
