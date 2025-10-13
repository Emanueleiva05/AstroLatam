import AppError from "../utils/AppError.js";
import { ListarCiudadEspecifico } from "../service/CiudadService.js";
import { ListarProvinciaEspecifico } from "../service/ProvinciaService.js";

export const ValidarDatosCiudad = (req, res, next) => {
  const { nombre, idProvincia } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para la ciudad", 400);
  }

  if (!idProvincia || isNaN(Number(idProvincia))) {
    throw new AppError("idProvincia no valido para la ciudad", 400);
  }

  next();
};

export const EncontrarCiudad = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ciudad = await ListarCiudadEspecifico(id);
    if (!ciudad) {
      throw new AppError("No se encontro la ciudad especifica", 404);
    }
    req.ciudad = ciudad;

    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaProvincia = async (req, res, next) => {
  try {
    const { idProvincia } = req.body;

    const provincia = await ListarProvinciaEspecifico(idProvincia);
    if (!provincia) {
      throw new AppError("No se encontro la provincia especifica", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
