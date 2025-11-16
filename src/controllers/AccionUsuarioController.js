import {
  createUserAction,
  updateUserAction,
  deleteUserAction,
  getUserActions,
  updateReportStatus,
  getOpenReports,
  countContentReports,
  hideReportedContent,
} from "../service/AccionUsuarioService.js";

export const createUserActionHandler = async (req, res, next) => {
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;
  try {
    await createUserAction(
      tipo,
      contenido,
      targetType,
      targetId,
      fecha,
      idUsuario
    );
    res.status(201).json({ message: "AccionUsuario creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateUserActionHandler = async (req, res, next) => {
  const { tipo, contenido, targetType, targetId, fecha, idUsuario } = req.body;
  const accion = req.accion;
  try {
    await updateUserAction(
      accion,
      tipo,
      contenido,
      targetType,
      targetId,
      fecha,
      idUsuario
    );
    res.status(204).json({ message: "AccionUsuario modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteUserActionHandler = async (req, res, next) => {
  try {
    const accion = req.accion;
    await deleteUserAction(accion);
    res.status(204).json({ message: "AccionUsuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getUserActionsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const accionusuarios = await getUserActions(page, size);
    res.status(200).json(accionusuarios);
  } catch (error) {
    next(error);
  }
};

export const getUserActionHandler = async (req, res, next) => {
  try {
    const accionusuario = req.accion;
    res.status(200).json(accionusuario);
  } catch (error) {
    next(error);
  }
};

export const updateReportStatusHandler = async (req, res, next) => {
  try {
    await updateReportStatus(req.accion, nota, estado);
    res.status(204).json({ message: "Cambio de estado realizado" });
  } catch (error) {
    next(error);
  }
};

export const getOpenReportsHandler = async (req, res, next) => {
  try {
    const reportes = await getOpenReports();
    res.status(200).json(reportes);
  } catch (error) {
    next(error);
  }
};

export const countContentReportsHandler = async (req, res, next) => {
  try {
    const contar = await countContentReports(req.params.targetType);
    res.status(204).json({ cantidad: contar });
  } catch (error) {
    next(error);
  }
};

export const hideReportedContentHandler = async (req, res, next) => {
  try {
    const message = await hideReportedContent(
      req.params.targetType,
      parseInt(req.params.targetId)
    );
    res.status(204).json({
      message: message,
    });
  } catch (error) {
    next(error);
  }
};
