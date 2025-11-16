import {
  createPublication,
  deletePublication,
  updatePublication,
  getPublications,
  updatePublicationVisibility,
} from "../service/PublicacionService.js";
import { createPublicationHistory } from "../service/HistorialPublicacionService.js";

export const createPublicationHandler = async (req, res, next) => {
  const {
    titulo,
    descripcion,
    idUsuario,
    fechaPublicacion,
    idTipoPublicacion,
  } = req.body;
  try {
    await createPublication(
      titulo,
      descripcion,
      idUsuario,
      fechaPublicacion,
      idTipoPublicacion
    );
    res.status(201).json({ message: "Publicacion creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updatePublicationHandler = async (req, res, next) => {
  const publicacion = req.publicacion;
  const { titulo, descripcion } = req.body;

  try {
    await createPublicationHistory(
      publicacion.idPublicacion,
      publicacion.titulo,
      publicacion.descripcion,
      publicacion.fechaPublicacion,
      publicacion.idTipoPublicacion,
      publicacion.idUsuario
    );

    await updatePublication(publicacion, titulo, descripcion);
    res.status(204).json({ message: "Publicacion modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deletePublicationHandler = async (req, res) => {
  const publicacion = req.publicacion;
  try {
    await deletePublication(publicacion);
    res.status(204).json({ message: "Publicacion eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getPublicationsHandler = async (req, res) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const publicaciones = await getPublications(page, size);
    res.status(200).json(publicaciones);
  } catch (error) {
    next(error);
  }
};

export const getPublicationHandler = async (req, res) => {
  const publicacion = req.publicacion;
  try {
    const pub = publicacion;
    res.status(200).json(pub);
  } catch (error) {
    next(error);
  }
};

export const updatePublicationVisibilityHandler = async (req, res, next) => {
  try {
    await updatePublicationVisibility(req.publicacion, req.visibilidad);
    res.status(204).json({ meesage: "Se cambio el visibilidad con exito" });
  } catch (error) {
    next(error);
  }
};
