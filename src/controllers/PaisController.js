import {
  createCountry,
  deleteCountry,
  updateCountry,
  getCountries,
} from "../service/PaisService.js";

export const createCountryHandler = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await createCountry(nombre);
    res.status(201).json({
      message: "Se agrego el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCountryHandler = async (req, res, next) => {
  const pais = req.pais;
  const { nombre } = req.body;
  try {
    await updateCountry(pais, nombre);
    res.status(204).json({
      message: "Se modifico el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCountryHandler = async (req, res, next) => {
  const pais = req.params;
  try {
    await deleteCountry(pais);
    res.status(204).json({
      message: "Se elimino el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getCountriesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const paises = await getCountries(page, size);
    res.status(200).json(paises);
  } catch (error) {
    next(error);
  }
};

export const getCountryHandler = async (req, res, next) => {
  const pais = req.params;
  try {
    const pa = pais;
    res.status(200).json(pa);
  } catch (error) {
    next(error);
  }
};
