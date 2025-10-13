import {
  AgregarPublicacion,
  EliminarPublicacion,
  ModificarPublicacion,
  ListarPublicaciones,
} from "../service/PublicacionService.js";

export const SetPublicacion = async (req, res, next) => {
  const {
    titulo,
    descripcion,
    idUsuario,
    fechaPublicacion,
    idTipoPublicacion,
  } = req.body;
  try {
    await AgregarPublicacion(
      titulo,
      descripcion,
      idUsuario,
      fechaPublicacion,
      idTipoPublicacion
    );
    res.status(200).json({ message: "Publicacion creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdatePublicacion = async (req, res, next) => {
  const publicacion = req.publicacion;
  const {
    titulo,
    descripcion,
    idUsuario,
    fechaPublicacion,
    idTipoPublicacion,
  } = req.body;

  try {
    await ModificarPublicacion(
      publicacion,
      titulo,
      descripcion,
      idUsuario,
      fechaPublicacion,
      idTipoPublicacion
    );
    res.status(200).json({ message: "Publicacion modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeletePublicacion = async (req, res) => {
  const publicacion = req.publicacion;
  try {
    await EliminarPublicacion(publicacion);
    res.status(200).json({ message: "Publicacion eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadPublicacion = async (req, res) => {
  try {
    const publicaciones = await ListarPublicaciones();
    res.status(200).json(publicaciones);
  } catch (error) {
    next(error);
  }
};

export const ReadPublicacionEspecifico = async (req, res) => {
  const publicacion = req.publicacion;
  try {
    const pub = publicacion;
    res.status(200).json(pub);
  } catch (error) {
    next(error);
  }
};
