import { AppError } from "../utils/AppError.js";
import { ListarTipoAdjuntoEspecifico } from "../service/TipoAdjuntoService.js";

export const ValidarDatosTiposAdjunto = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo adjunto", 400);
  }

  next();
};

export const EncontrarTipoAdjunto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoAdjunto = await ListarTipoAdjuntoEspecifico(id);

    if (!tipoAdjunto) {
      throw new AppError("No se encontro el tipoAdjunto especifico", 404);
    }

    req.tipoAdjunto = tipoAdjunto;

    next();
  } catch (error) {
    next(error);
  }
};
