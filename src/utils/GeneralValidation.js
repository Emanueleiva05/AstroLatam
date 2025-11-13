import AppError from "./AppError.js";

export const VerificarVisibilidad = (req, res, next) => {
  try {
    const visibilidad = req.body.visibilidad;
    const estado = ["privada", "miembros", "publica"];
    if (!estado.includes(visibilidad)) {
      throw new AppError("Estado de visibilidad invalido", 400);
    }
    req.visibilidad = visibilidad;
    next();
  } catch (error) {
    next(error);
  }
};

export const validarPageSize = (req, res, next) => {
  const { page, size } = req.query;

  if (page !== undefined) {
    if (isNaN(page) || parseInt(page, 10) < 0) {
      throw new AppError(
        "Numero de pagina invalido. Debe ser un numero entero no negativo.",
        400
      );
    }
  }

  if (size !== undefined) {
    if (isNaN(size) || parseInt(size, 10) <= 0) {
      throw new AppError(
        "Tamano de pagina invalido. Debe ser un numero entero mayor que cero.",
        400
      );
    }
  }

  next();
};
