import {
  AgregarInstrumento,
  ListarInstrumentoEspecifico,
  ListarInstrumentos,
  EliminarInstrumento,
  ModificarInstrumento,
} from "../service/InstrumentoService.js";

export const SetInstrumento = async (req, res) => {
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
    res.status(200).json({ message: "Instrumento creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateInstrumento = async (req, res) => {
  const { id } = req.params;
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
      await ListarInstrumentoEspecifico(id),
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
    res.status(200).json({ message: "Instrumento modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteInstrumento = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarInstrumento(await ListarInstrumentoEspecifico(id));
    res.status(200).json({ message: "Instrumento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumento = async (req, res) => {
  try {
    const instrumentos = await ListarInstrumentos();
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumentoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const instrumento = await ListarInstrumentoEspecifico(id);
    res.status(200).json(instrumento);
  } catch (error) {
    next(error);
  }
};
