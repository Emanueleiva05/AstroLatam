import AppError from "../utils/AppError.js";
import { ListarAccionUsuarioEspecifico } from "../service/AccionUsuarioService.js";
import { ListarUsuarioEspecifico } from "../service/UsuarioService.js";

export const ValidarDatosAccionUsuario = (req, res, next) => {
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;

  const tipoAccion = ["like", "comentario", "reporte"];
  const tipoContenido = ["publicacion", "observacion"];

  if (!tipo || !tipoAccion.includes(tipo)) {
    throw new AppError("Tipo de accion no válida para la accionUsuario", 400);
  }

  if (!targetType || !tipoContenido.includes(targetType)) {
    throw new AppError(
      "Tipo de contenido no válida para la accionUsuario",
      400
    );
  }

  if (!contenido) {
    throw new AppError("Contenido no válido para la accionUsuario", 400);
  }

  if (targetId && isNaN(Number(targetId))) {
    throw new AppError("Id del tipo de contenido no válida", 400);
  }

  if (fecha && isNaN(Date.parse(fecha))) {
    throw new AppError("Fecha no válido", 400);
  }

  if (!idUsuario || isNaN(Number(idUsuario))) {
    throw new AppError("idUsuario no válido", 400);
  }

  next();
};

export const EncontrarAccionUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const accion = await ListarAccionUsuarioEspecifico(id);
    if (!accion) {
      throw new AppError("No se encontró la accion especificado", 404);
    }
    req.accion = accion;
    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaUsuario = async (req, res, next) => {
  try {
    const { idUsuario } = req.body;
    const usuario = await ListarUsuarioEspecifico(idUsuario);
    if (!usuario) {
      throw new AppError("No se encontró el usuario especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validarContenido = (req, res, next) => {
  if (req.accion.tipo === "comentario" || req.accion.tipo === "reporte") {
    if (!contenido) {
      throw new AppError(
        "Necesitas agregar un contenido a un comentario o reporte",
        400
      );
    }
  }
  next();
};
