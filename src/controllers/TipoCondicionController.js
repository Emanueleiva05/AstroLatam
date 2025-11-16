import {
  createConditionType,
  getConditionTypes,
  deleteConditionType,
  updateConditionType,
} from "../service/TipoCondicionService.js";

export const createAttachmentType = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await createConditionType(nombre);
    res.status(201).json({
      message: "Se agrego el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateAttachmentType = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoCondicion = req.tipoCondicion;
  try {
    await updateConditionType(tipoCondicion, nombre);
    res.status(204).json({
      message: "Se modifico el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAttachmentType = async (req, res, next) => {
  const tipoCondicion = req.tipoCondicion;
  try {
    await deleteConditionType(tipoCondicion);
    res.status(204).json({
      message: "Se elimino el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getAttachmentTypes = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tiposCondiciones = await getConditionTypes(page, size);
    res.status(200).json(tiposCondiciones);
  } catch (error) {
    next(error);
  }
};

export const getAttachmentTypeById = async (req, res, next) => {
  const tipoCondicion = req.tipoCondicion;
  try {
    const tipoC = tipoCondicion;
    res.status(200).json(tipoC);
  } catch (error) {
    next(error);
  }
};
