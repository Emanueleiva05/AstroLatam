import { AppError } from "../utils/AppError.js";
import { ListarPaisEspecifico } from "../service/PaisService.js";

export const ValidarDatosPais = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el pais", 400);
  }

  next();
};

export const EncontrarPais = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pais = await ListarPaisEspecifico(id);
    if (!pais) {
      throw new AppError("No se encontro el pais especifico", 404);
    }
    req.pais = pais;

    next();
  } catch (error) {
    next(error);
  }
};
