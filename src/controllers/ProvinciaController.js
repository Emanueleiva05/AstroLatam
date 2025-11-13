import {
  AgregarProvincia,
  ListarProvincias,
  EliminarProvincia,
  ModificarProvincia,
} from "../service/ProvinciaService.js";

export const SetProvincia = async (req, res, next) => {
  const { nombre, idPais } = req.body;
  try {
    await AgregarProvincia(nombre, idPais);
    res.status(201).json({
      message: "Se agrego el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateProvincia = async (req, res, next) => {
  const provincia = req.provincia;
  const { nombre, idPais } = req.body;
  try {
    await ModificarProvincia(provincia, nombre, idPais);
    res.status(204).json({
      message: "Se modifico el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteProvincia = async (req, res, next) => {
  const provincia = req.provincia;
  try {
    await EliminarProvincia(provincia);
    res.status(204).json({
      message: "Se elimino el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadProvincias = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const provincias = await ListarProvincias(page, size);
    res.status(200).json(provincias);
  } catch (error) {
    next(error);
  }
};

export const ReadProvinciaEspecifico = async (req, res, next) => {
  const provincia = req.provincia;
  try {
    const pro = provincia;
    res.status(200).json(pro);
  } catch (error) {
    next(error);
  }
};
