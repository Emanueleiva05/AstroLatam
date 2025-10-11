import {
  ListarAdjuntoEspecifico,
  AgregarAdjunto,
  ModificarAdjunto,
  ListarAdjunto,
  EliminarAdjunto,
} from "../service/AdjuntoService.js";

export const SetAdjunto = async (req, res) => {
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;
  try {
    await AgregarAdjunto(link_archivo, descripcion, idTipoAdjunto);
    res.status(200).json({ message: "Adjunto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateAdjunto = async (req, res) => {
  const { id } = req.params;
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;

  try {
    await ModificarAdjunto(
      await ListarAdjuntoEspecifico(id),
      link_archivo,
      descripcion,
      idTipoAdjunto
    );
    res.status(200).json({ message: "Adjunto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteAdjunto = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarAdjunto(await ListarAdjuntoEspecifico(id));
    res.status(200).json({ message: "Adjunto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntos = async (req, res) => {
  try {
    const adjuntos = await ListarAdjunto();
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const adjunto = await ListarAdjuntoEspecifico(id);
    res.status(200).json(adjunto);
  } catch (error) {
    next(error);
  }
};
