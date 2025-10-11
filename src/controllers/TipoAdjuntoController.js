import {
  AgregarTipoAdjunto,
  ListarTipoAdjuntoEspecifico,
  ListarTipoAdjuntos,
  EliminarTipoAdjunto,
  ModificarTipoAdjunto,
} from "../service/TipoAdjuntoService.js";

export const SetTipoAdjunto = async (req, res) => {
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

export const UpdateTipoAdjunto = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await ModificarTipoAdjunto(await ListarTipoAdjuntoEspecifico(id), nombre);
    res.status(200).json({
      message: "Se modifico el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoAdjunto = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoAdjunto(await ListarTipoAdjuntoEspecifico(id));
    res.status(200).json({
      message: "Se elimino el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadTiposAdjuntos = async (req, res) => {
  try {
    const TiposAdjuntos = await ListarTipoAdjuntos();
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoAdjunto = async (req, res) => {
  const { id } = req.params;
  try {
    const TiposAdjuntos = await ListarTipoAdjuntoEspecifico(id);
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};
