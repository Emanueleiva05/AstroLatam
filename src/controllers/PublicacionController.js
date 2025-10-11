import {
  AgregarPublicacion,
  EliminarPublicacion,
  ModificarPublicacion,
  ListarPublicacionEspecifico,
  ListarPublicaciones,
} from "../service/PublicacionService.js";

export const SetPublicacion = async (req, res) => {
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

export const UpdatePublicacion = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    idUsuario,
    fechaPublicacion,
    idTipoPublicacion,
  } = req.body;

  try {
    await ModificarPublicacion(
      await ListarPublicacionEspecifico(id),
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
  const { id } = req.params;
  try {
    await EliminarPublicacion(await ListarPublicacionEspecifico(id));
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
  const { id } = req.params;
  try {
    const publicacion = await ListarPublicacionEspecifico(id);
    res.status(200).json(publicacion);
  } catch (error) {
    next(error);
  }
};
