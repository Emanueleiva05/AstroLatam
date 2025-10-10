import {
  AgregarObservacion,
  EliminarObservacion,
  ModificarObservacion,
  ListarObservacionEspecifico,
  ListarObservaciones,
} from "../service/ObservacionService.js";

export const SetObservacion = async (req, res) => {
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;
  try {
    await AgregarObservacion(
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion
    );
    res.status(200).json({ message: "Observacion creado con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrio un error a la hora de crear un Observacion",
    });
  }
};

export const UpdateObservacion = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;

  try {
    await ModificarObservacion(
      await ListarObservacionEspecifico(id),
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion
    );
    res.status(200).json({ message: "Observacion modificado con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrio un error a la hora de modificar un Observacion",
    });
  }
};

export const DeleteObservacion = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarObservacion(await ListarObservacionEspecifico(id));
    res.status(200).json({ message: "Observacion eliminado con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrio un error a la hora de eliminar un Observacion",
    });
  }
};

export const ReadObservacion = async (req, res) => {
  try {
    const observaciones = await ListarObservaciones();
    res.status(200).json(observaciones);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocurrio un error a la hora de listar Observacion" });
  }
};

export const ReadObservacionEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const observacion = await ListarObservacionEspecifico(id);
    res.status(200).json(observacion);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocurrio un error a la hora de listar Observacion" });
  }
};
