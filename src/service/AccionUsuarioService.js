import AccionUsuario from "../models/AccionUsuario.js";
import { AppError } from "../utils/AppError.js";

export const AgregarAccionUsuario = async (
  tipo,
  contenido,
  targetType,
  targetId,
  fecha,
  idUsuario
) => {
  return await AccionUsuario.create({
    tipo: tipo,
    contenido: contenido,
    targetType: targetType,
    targetId: targetId,
    fecha: fecha,
    idUsuario: idUsuario,
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

export const ListarAccionUsuarios = async () => {
  const acciones = await AccionUsuario.findAll();
  if (acciones.length === 0) {
    throw new AppError("No se encontraron acciones de usuarios creados", 404);
  }
  return acciones;
};

export const ListarAccionUsuarioEspecifico = async (id) => {
  const accion = await AccionUsuario.findByPk(id);
  if (!accion) {
    throw new AppError("No se encontro la accion del usuario especifico", 404);
  }
  return accion;
};
