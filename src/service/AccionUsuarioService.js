import { Op } from "sequelize";
import AccionUsuario from "../models/AccionUsuario.js";
import AppError from "../utils/AppError.js";
import Publicacion from "../models/Publicacion.js";
import Observacion from "../models/Observacion.js";

export const AgregarAccionUsuario = async (
  tipo,
  contenido,
  targetType,
  targetId,
  fecha,
  idUsuario
) => {
  return await AccionUsuario.create({
    tipo,
    contenido,
    targetType,
    targetId,
    fecha,
    idUsuario,
  });
};

export const ModificarAccionUsuario = async (
  accionUsuario,
  tipo,
  contenido,
  targetType,
  targetId,
  fecha,
  idUsuario
) => {
  accionUsuario.tipo = tipo;
  accionUsuario.contenido = contenido;
  accionUsuario.targetType = targetType;
  accionUsuario.targetId = targetId;
  accionUsuario.fecha = fecha;
  accionUsuario.idUsuario = idUsuario;
  return await accionUsuario.save();
};

export const EliminarAccionUsuario = async (accionUsuario) => {
  return await accionUsuario.destroy();
};

export const ListarAccionUsuarios = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(page) * parseInt(size),
  };

  const acciones = await AccionUsuario.findAll(options);
  if (acciones.length === 0) {
    throw new AppError("No se encontraron acciones de usuarios creados", 404);
  }
  return acciones;
};

export const ListarAccionUsuarioEspecifico = async (id) => {
  const accion = await AccionUsuario.findByPk(id);
  return accion;
};

export const CambiarEstadoReporte = async (accionUsuario, nota, estado) => {
  accionUsuario.nota = nota;
  accionUsuario.estado = estado;
  return await accionUsuario.save();
};

export const ListarReportesNoCerrados = async () => {
  const acciones = await AccionUsuario.findAll({
    where: {
      tipo: "reporte",
      estado: { [Op.or]: ["en_revision", "enviada"] },
    },
  });
  if (acciones.length === 0) {
    throw new AppError("No se encontraron acciones de usuarios creados", 404);
  }
  return acciones;
};

export const ContarReportesDeUnContenido = async (targetType) => {
  const acciones = await AccionUsuario.count({
    where: {
      tipo: "reporte",
      targetType,
    },
  });

  return acciones;
};

export const OcultarContenido = async (targetType, targetId) => {
  const cantidadReportes = await AccionUsuario.count({
    where: {
      tipo: "reporte",
      targetId,
    },
  });

  if (cantidadReportes >= 5) {
    let target;
    if (targetType === "publicacion") {
      target = await Publicacion.findByPk(targetId);
    } else if (targetType === "observacion") {
      target = await Observacion.findByPk(targetId);
    }

    if (!target) {
      return "No se encontro ningun target con ese ID";
    }

    target.visibilidad = "privada";
    await target.save();
    return "Se cambio la visibilidad de la publicacion a privada";
  }
  return "No se llego a 5 reportes";
};
