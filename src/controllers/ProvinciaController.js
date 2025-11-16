import {
  createProvince,
  getProvincies,
  deleteProvince,
  updateProvince,
} from "../service/ProvinciaService.js";

export const createProvinceHandler = async (req, res, next) => {
  const { nombre, idPais } = req.body;
  try {
    await createProvince(nombre, idPais);
    res.status(201).json({
      message: "Se agrego el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProvinceHandler = async (req, res, next) => {
  const provincia = req.provincia;
  const { nombre, idPais } = req.body;
  try {
    await updateProvince(provincia, nombre, idPais);
    res.status(204).json({
      message: "Se modifico el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProvinceHandler = async (req, res, next) => {
  const provincia = req.provincia;
  try {
    await deleteProvince(provincia);
    res.status(204).json({
      message: "Se elimino el Provincia con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getProvincesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const provincias = await getProvincies(page, size);
    res.status(200).json(provincias);
  } catch (error) {
    next(error);
  }
};

export const getProvinceHandler = async (req, res, next) => {
  const provincia = req.provincia;
  try {
    const pro = provincia;
    res.status(200).json(pro);
  } catch (error) {
    next(error);
  }
};
