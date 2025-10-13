import {
  AgregarAccionUsuario,
  ModificarAccionUsuario,
  EliminarAccionUsuario,
  ListarAccionUsuarios,
} from "../service/AccionUsuarioService.js";

export const SetAccionUsuario = async (req, res, next) => {
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;
  try {
    await AgregarAccionUsuario(
      tipo,
      contenido,
      targetType,
      targetId,
      fecha,
      idUsuario
    );
    res.status(200).json({ message: "AccionUsuario creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateAccionUsuario = async (req, res, next) => {
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;
  const accion = req.accion;
  try {
    await ModificarAccionUsuario(
      accion,
      tipo,
      contenido,
      targetType,
      targetId,
      fecha,
      idUsuario
    );
    res.status(200).json({ message: "AccionUsuario modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteAccionUsuario = async (req, res, next) => {
  try {
    const accion = req.accion;
    await EliminarAccionUsuario(accion);
    res.status(200).json({ message: "AccionUsuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAccionUsuario = async (req, res, next) => {
  try {
    const accionusuarios = await ListarAccionUsuarios();
    res.status(200).json(accionusuarios);
  } catch (error) {
    next(error);
  }
};

export const ReadAccionUsuarioEspecifico = async (req, res, next) => {
  try {
    const accionusuario = req.accion;
    res.status(200).json(accionusuario);
  } catch (error) {
    next(error);
  }
};
