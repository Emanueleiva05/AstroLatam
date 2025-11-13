import {
  AgregarTipoInstrumento,
  ModificarTipoInstrumento,
  EliminarTipoInstrumento,
  ListarTipoInstrumentos,
} from "../service/TipoInstrumentoService.js";

export const SetTipoInstrumento = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoInstrumento(nombre, descripcion);
    res.status(201).json({ message: "Se creo el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoInstrumento = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoInstrumento(tipoInstrumento, nombre, descripcion);
    res
      .status(204)
      .json({ message: "Se modifico el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoInstrumento = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  try {
    await EliminarTipoInstrumento(tipoInstrumento);
    res
      .status(204)
      .json({ message: "Se elimino el Tipo Instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadTipoInstrumentoEspecifico = async (req, res, next) => {
  const tipoInstrumento = req.tipoInstrumento;
  try {
    const tipoIn = tipoInstrumento;
    res.status(200).json(tipoIn);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoInstrumento = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tipoPublicaciones = await ListarTipoInstrumentos(page, size);
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    next(error);
  }
};
