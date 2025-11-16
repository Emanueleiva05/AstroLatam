import {
  createObservationCondition,
  deleteObservationCondition,
  updateObservationCondition,
  getObservationConditions,
} from "../service/ObservacionCondicionService.js";

export const createObservationConditionHandler = async (req, res, next) => {
  const { valor, idTipoCondicion, idObservacion } = req.body;
  try {
    await createObservationCondition(valor, idTipoCondicion, idObservacion);
    res
      .status(201)
      .json({ message: "ObservacionCondiciones creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateObservationConditionHandler = async (req, res, next) => {
  const condicion = req.condicion;
  const { valor, idTipoCondicion, idObservacion } = req.body;

  try {
    await updateObservationCondition(
      condicion,
      valor,
      idTipoCondicion,
      idObservacion
    );
    res
      .status(204)
      .json({ message: "ObservacionCondiciones modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteObservationConditionHandler = async (req, res, next) => {
  const condicion = req.condicion;
  try {
    await deleteObservationCondition(condicion);
    res
      .status(204)
      .json({ message: "ObservacionCondiciones eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getObservationConditionsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const condiciones = await getObservationConditions(page, size);
    res.status(200).json(condiciones);
  } catch (error) {
    next(error);
  }
};

export const getObservationConditionHan = async (req, res, next) => {
  const condicion = req.condicion;
  try {
    const cond = condicion;
    res.status(200).json(cond);
  } catch (error) {
    next(error);
  }
};
