import {
  AgregarTipoPublicacion,
  EliminarTipoPublicacion,
  ModificarTipoPublicacion,
  ListarTipoPublicaciones,
} from "../service/TipoPublicacionService.js";

export const SetTipoPublicacion = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoPublicacion(nombre, descripcion);
    res.status(200).json({ message: "Se creo el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoPublicacion = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoPublicacion(tipoPublicacion, nombre, descripcion);
    res
      .status(200)
      .json({ message: "Se modifico el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoPublicacion = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  try {
    await EliminarTipoPublicacion(tipoPublicacion);
    res
      .status(200)
      .json({ message: "Se elimino el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadTipoPublicacionEspecifico = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  try {
    const tipoPu = tipoPublicacion;
    res.status(200).json(tipoPu);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoPublicacion = async (req, res, next) => {
  try {
    const tipoPublicaciones = await ListarTipoPublicaciones();
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    next(error);
  }
};
