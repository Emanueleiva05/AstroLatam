import { AppError } from "../utils/AppError.js";
import { ListarPublicacionEspecifico } from "../service/PublicacionService.js";
import { ListarTipoPublicacionEspecifico } from "../service/TipoPublicacionService.js";

export const ValidarDatosPublicacion = (req, res, next) => {
  const { titulo, descripcion, fechaPublicacion, idTipoPublicacion } = req.body;

  if (!titulo || titulo.trim() === "") {
    throw new AppError("Nombre no valido para la publicacion", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("descripcion no valido para la publicacion", 400);
  }

  if (!fechaPublicacion || isNaN(Date.parse(fechaPublicacion))) {
    throw new AppError("fechaPublicacion no valido para la publicacion", 400);
  }

  if (!idTipoPublicacion || isNaN(Number(idTipoPublicacion))) {
    throw new AppError("idTipoPublicacion no valido", 400);
  }

  next();
};

export const EncontrarPublicacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const publicacion = await ListarPublicacionEspecifico(id);
    if (!publicacion) {
      throw new AppError("No se encontro la publicacion especifica", 404);
    }
    req.publicacion = publicacion;

    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaTipoPublicacion = async (req, res, next) => {
  try {
    const { idTipoPublicacion } = req.body;

    const tipoPublicacion = await ListarTipoPublicacionEspecifico(
      idTipoPublicacion
    );
    if (!tipoPublicacion) {
      throw new AppError("No se encontro el tipoPublicacion especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
