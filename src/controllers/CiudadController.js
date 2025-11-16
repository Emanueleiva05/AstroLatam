import {
  createCity,
  getCities,
  updateCity,
  deleteCity,
} from "../service/CiudadService.js";

export const createCityHandler = async (req, res, next) => {
  const { nombre, idProvincia } = req.body;
  try {
    await createCity(nombre, idProvincia);
    res.status(201).json({
      message: "Se agrego el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCityHandler = async (req, res, next) => {
  const ciudad = req.ciudad;
  const { nombre, idProvincia } = req.body;
  try {
    await updateCity(ciudad, nombre, idProvincia);
    res.status(204).json({
      message: "Se modifico el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCityHandler = async (req, res, next) => {
  const ciudad = req.ciudad;
  try {
    await deleteCity(ciudad);
    res.status(204).json({
      message: "Se elimino el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getCitiesHandler = async (req, res, next) => {
  try {
    const size = req.query.size;
    const page = req.query.page;

    const ciudades = await getCities(page, size);
    res.status(200).json(ciudades);
  } catch (error) {
    next(error);
  }
};

export const getCityHandler = async (req, res, next) => {
  const ciudad = req.ciudad;
  try {
    const ciu = ciudad;
    res.status(200).json(ciu);
  } catch (error) {
    next(error);
  }
};
