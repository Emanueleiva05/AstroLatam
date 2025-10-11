import {
  AgregarObservacionCondicion,
  EliminarObservacionCondicion,
  ModificarObservacionCondicion,
  ListarObservacionCondicionEspecifico,
  ListarObservacionCondiciones,
} from "../service/ObservacionCondicionService.js";

export const SetObservacionCondiciones = async (req, res) => {
  const { valor, idTipoCondicion, idObservacion } = req.body;
  try {
    await AgregarObservacionCondicion(valor, idTipoCondicion, idObservacion);
    res
      .status(200)
      .json({ message: "ObservacionCondiciones creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObservacionCondiciones = async (req, res) => {
  const { id } = req.params;
  const { valor, idTipoCondicion, idObservacion } = req.body;

  try {
    await ModificarObservacionCondicion(
      await ListarObservacionCondicionEspecifico(id),
      valor,
      idTipoCondicion,
      idObservacion
    );
    res
      .status(200)
      .json({ message: "ObservacionCondiciones modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteObservacionCondiciones = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarObservacionCondicion(
      await ListarObservacionCondicionEspecifico(id)
    );
    res
      .status(200)
      .json({ message: "ObservacionCondiciones eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObservacionCondiciones = async (req, res) => {
  try {
    const publicaciones = await ListarObservacionCondiciones();
    res.status(200).json(publicaciones);
  } catch (error) {
    next(error);
  }
};

export const ReadObservacionCondicionesEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const publicacion = await ListarObservacionCondicionEspecifico(id);
    res.status(200).json(publicacion);
  } catch (error) {
    next(error);
  }
};
