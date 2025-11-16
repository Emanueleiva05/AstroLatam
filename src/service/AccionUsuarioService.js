import { Op } from "sequelize";
import AccionUsuario from "../models/AccionUsuario.js";
import AppError from "../utils/AppError.js";
import Publicacion from "../models/Publicacion.js";
import Observacion from "../models/Observacion.js";

export const createUserAction = async (
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

export const updateUserAction = async (
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

export const deleteUserAction = async (accionUsuario) => {
  return await accionUsuario.destroy();
};

export const getUserActions = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(page) * parseInt(size),
  };

  const { count, rows } = await AccionUsuario.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron acciones de usuarios creados", 404);
  }

  return {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };
};

export const getUserActionById = async (id) => {
  const accion = await AccionUsuario.findByPk(id);
  return accion;
};

export const updateReportStatus = async (accionUsuario, nota, estado) => {
  accionUsuario.nota = nota;
  accionUsuario.estado = estado;
  return await accionUsuario.save();
};

export const getOpenReports = async () => {
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

export const countContentReports = async (targetType) => {
  const acciones = await AccionUsuario.count({
    where: {
      tipo: "reporte",
      targetType,
    },
  });

  return acciones;
};

export const hideReportedContent = async (targetType, targetId) => {
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
