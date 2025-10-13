import {
  AgregarTipoAdjunto,
  ListarTipoAdjuntos,
  EliminarTipoAdjunto,
  ModificarTipoAdjunto,
} from "../service/TipoAdjuntoService.js";

export const SetTipoAdjunto = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await AgregarTipoAdjunto(nombre);
    res.status(200).json({
      message: "Se agrego el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoAdjunto = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoAdjunto = req.tipoAdjunto;
  try {
    await ModificarTipoAdjunto(tipoAdjunto, nombre);
    res.status(200).json({
      message: "Se modifico el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoAdjunto = async (req, res, next) => {
  const tipoAdjunto = req.tipoAdjunto;

  try {
    await EliminarTipoAdjunto(tipoAdjunto);
    res.status(200).json({
      message: "Se elimino el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadTiposAdjuntos = async (req, res, next) => {
  try {
    const TiposAdjuntos = await ListarTipoAdjuntos();
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoAdjunto = async (req, res, next) => {
  const tipoAdjunto = req.tipoAdjunto;
  try {
    const tipoAd = tipoAdjunto;
    res.status(200).json(tipoAd);
  } catch (error) {
    next(error);
  }
};
