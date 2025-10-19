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
