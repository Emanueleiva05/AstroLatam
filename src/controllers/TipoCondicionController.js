import {
  AgregarTipoCondicion,
  ListarTipoCondiciones,
  EliminarTipoCondicion,
  ModificarTipoCondicion,
} from "../service/TipoCondicionService.js";

export const SetTipoCondicion = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await AgregarTipoCondicion(nombre);
    res.status(201).json({
      message: "Se agrego el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoCondicion = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoCondicion = req.tipoCondicion;
  try {
    await ModificarTipoCondicion(tipoCondicion, nombre);
    res.status(204).json({
      message: "Se modifico el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoCondicion = async (req, res, next) => {
  const tipoCondicion = req.tipoCondicion;
  try {
    await EliminarTipoCondicion(tipoCondicion);
    res.status(204).json({
      message: "Se elimino el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadTiposCondiciones = async (req, res, next) => {
  try {
    const tiposCondiciones = await ListarTipoCondiciones();
    res.status(200).json(tiposCondiciones);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoCondicion = async (req, res, next) => {
  const tipoCondicion = req.tipoCondicion;
  try {
    const tipoC = tipoCondicion;
    res.status(200).json(tipoC);
  } catch (error) {
    next(error);
  }
};
