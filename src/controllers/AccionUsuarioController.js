import {
  AgregarAccionUsuario,
  ModificarAccionUsuario,
  EliminarAccionUsuario,
  ListarAccionUsuarioEspecifico,
  ListarAccionUsuarios,
} from "../service/AccionUsuarioService.js";

export const SetAccionUsuario = async (req, res) => {
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

export const UpdateAccionUsuario = async (req, res) => {
  const { id } = req.params;
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;

  try {
    await ModificarAccionUsuario(
      await ListarAccionUsuarioEspecifico(id),
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

export const DeleteAccionUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarAccionUsuario(await ListarAccionUsuarioEspecifico(id));
    res.status(200).json({ message: "AccionUsuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAccionUsuario = async (req, res) => {
  try {
    const accionusuarios = await ListarAccionUsuarios();
    res.status(200).json(accionusuarios);
  } catch (error) {
    next(error);
  }
};

export const ReadAccionUsuarioEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const accionusuario = await ListarAccionUsuarioEspecifico(id);
    res.status(200).json(accionusuario);
  } catch (error) {
    next(error);
  }
};
