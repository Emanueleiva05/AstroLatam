import AppError from "../utils/AppError.js";
import { getInstrumentById } from "../service/InstrumentoService.js";
import { getInstrumentTypeById } from "../service/TipoInstrumentoService.js";

export const validateInstrumentData = (req, res, next) => {
  const {
    nombre,
    descripcion,
    apertura,
    distancia_focal,
    tipo_telescopio,
    aumento,
    diametro,
    tipo_prisma,
    idTipoInstrumento,
  } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no válido para el instrumento", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("Descripción no válida para el instrumento", 400);
  }

  const prismasValidos = ["Universales", "Gran formato", "Compacto"];
  const telescopiosValidos = ["Refractores", "Reflectores", "Catadioptricos"];

  if (apertura && isNaN(Number(apertura))) {
    throw new AppError("Apertura no válida (debe ser número)", 400);
  }

  if (distancia_focal && isNaN(Number(distancia_focal))) {
    throw new AppError("Distancia focal no válida (debe ser número)", 400);
  }

  if (diametro && isNaN(Number(diametro))) {
    throw new AppError("Diámetro no válido (debe ser número)", 400);
  }

  if (aumento && isNaN(Number(aumento))) {
    throw new AppError("Aumento no válido (debe ser número)", 400);
  }

  if (tipo_prisma && !prismasValidos.includes(tipo_prisma)) {
    throw new AppError("Tipo de prisma no válido", 400);
  }

  if (tipo_telescopio && !telescopiosValidos.includes(tipo_telescopio)) {
    throw new AppError("Tipo de telescopio no válido", 400);
  }

  if (!idTipoInstrumento || isNaN(Number(idTipoInstrumento))) {
    throw new AppError("IdTipoInstrumento no válido", 400);
  }

  next();
};

export const findInstrument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instrumento = await getInstrumentById(id);
    if (!instrumento) {
      throw new AppError("No se encontró el instrumento especificado", 404);
    }
    req.instrumento = instrumento;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateInstrumentTypeExists = async (req, res, next) => {
  try {
    const { idTipoInstrumento } = req.body;
    const tipoInstrumento = await getInstrumentTypeById(idTipoInstrumento);
    if (!tipoInstrumento) {
      throw new AppError(
        "No se encontró el tipo de instrumento especificado",
        404
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
