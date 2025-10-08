import AccionUsuario from "../models/AccionUsuario.js";

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

export const ListarAccionUsuarios = async (id) => {
  return await AccionUsuario.findAll({
    where: {
      idUsuario: id,
    },
  });
};

export const ListarAccionUsuarioEspecifico = async (id) => {
  return await AccionUsuario.findByPk(id);
};
