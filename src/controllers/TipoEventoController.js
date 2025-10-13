import {
  AgregarTipoEvento,
  ListarTipoEventos,
  ModificarTipoEvento,
  EliminarTipoEvento,
} from "../service/TipoEventoService.js";

export const SetTipoEvento = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await AgregarTipoEvento(nombre);
    res.status(200).json({
      message: "Se agrego el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoEvento = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoEvento = req.evento;
  try {
    await ModificarTipoEvento(tipoEvento, nombre);
    res.status(200).json({
      message: "Se modifico el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoEvento = async (req, res, next) => {
  const tipoEvento = req.evento;
  try {
    await EliminarTipoEvento(tipoEvento);
    res.status(200).json({
      message: "Se elimino el TipoEvento con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadTiposEvento = async (req, res, next) => {
  try {
    const tiposEventos = await ListarTipoEventos();
    res.status(200).json(tiposEventos);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoEvento = async (req, res, next) => {
  const tipoEvento = req.evento;
  try {
    const TipoE = tipoEvento;
    res.status(200).json(TipoE);
  } catch (error) {
    next(error);
  }
};
