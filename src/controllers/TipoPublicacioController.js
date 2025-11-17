import {
  createPublicationType,
  deletePublicationType,
  updatePublicationType,
  getPublicationTypes,
} from "../service/TipoPublicacionService.js";

export const createPublicationTypeHandler = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await createPublicationType(nombre, descripcion);
    res.status(201).json({ message: "Se creo el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const updatePublicationTypeHandler = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  const { nombre, descripcion } = req.body;
  try {
    await updatePublicationType(tipoPublicacion, nombre, descripcion);
    res
      .status(204)
      .json({ message: "Se modifico el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const deletePublicationTypeHandler = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  try {
    await deletePublicationType(tipoPublicacion);
    res
      .status(204)
      .json({ message: "Se elimino el Tipo Publicacion con exito" });
  } catch (error) {
    next(error);
  }
};

export const getPublicationTypeHandler = async (req, res, next) => {
  const tipoPublicacion = req.tipoPublicacion;
  try {
    const tipoPu = tipoPublicacion;
    res.status(200).json(tipoPu);
  } catch (error) {
    next(error);
  }
};

export const getPublicationTypesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tipoPublicaciones = await getPublicationTypes(page, size);
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    next(error);
  }
};
