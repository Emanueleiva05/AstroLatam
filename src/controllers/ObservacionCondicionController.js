import {
  AgregarObservacionCondicion,
  EliminarObservacionCondicion,
  ModificarObservacionCondicion,
  ListarObservacionCondiciones,
} from "../service/ObservacionCondicionService.js";

export const SetObservacionCondiciones = async (req, res, next) => {
  const { valor, idTipoCondicion, idObservacion } = req.body;
  try {
    await AgregarObservacionCondicion(valor, idTipoCondicion, idObservacion);
    res
      .status(201)
      .json({ message: "ObservacionCondiciones creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObservacionCondiciones = async (req, res, next) => {
  const condicion = req.condicion;
  const { valor, idTipoCondicion, idObservacion } = req.body;

  try {
    await ModificarObservacionCondicion(
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

export const DeleteObservacionCondiciones = async (req, res, next) => {
  const condicion = req.condicion;
  try {
    await EliminarObservacionCondicion(condicion);
    res
      .status(204)
      .json({ message: "ObservacionCondiciones eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObservacionCondiciones = async (req, res, next) => {
  try {
    const condiciones = await ListarObservacionCondiciones();
    res.status(200).json(condiciones);
  } catch (error) {
    next(error);
  }
};

export const ReadObservacionCondicionesEspecifico = async (req, res, next) => {
  const condicion = req.condicion;
  try {
    const cond = condicion;
    res.status(200).json(cond);
  } catch (error) {
    next(error);
  }
};
