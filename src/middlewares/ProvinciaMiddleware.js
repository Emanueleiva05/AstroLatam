import AppError from "../utils/AppError.js";
import { getProvincieById } from "../service/ProvinciaService.js";
import { getCountryById } from "../service/PaisService.js";

export const validateProvinceData = (req, res, next) => {
  const { nombre, idPais } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para la provincia", 400);
  }

  if (!idPais || isNaN(Number(idPais))) {
    throw new AppError("idPais no valido para la provincia", 400);
  }

  next();
};

export const findProvince = async (req, res, next) => {
  try {
    const { id } = req.params;

    const provincia = await getProvincieById(id);
    if (!provincia) {
      throw new AppError("No se encontro la provincia especifico", 404);
    }
    req.provincia = provincia;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateCountryExists = async (req, res, next) => {
  try {
    const { idPais } = req.body;

    const pais = await getCountryById(idPais);
    if (!pais) {
      throw new AppError("No se encontro el pais especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
