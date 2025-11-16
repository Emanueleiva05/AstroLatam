import HistorialPublicacion from "../models/HistorialPublicacion.js";

export const createPublicationHistory = async (
  idPublicacion,
  titulo,
  descripcion,
  fechaPublicacion,
  idTipoPublicacion,
  idUsuario
) => {
  const versionActual = await findLatestHistoryVersion(idPublicacion);
  const version = versionActual + 1;

  await HistorialPublicacion.create({
    idPublicacion,
    titulo,
    descripcion,
    fechaPublicacion,
    version,
    idTipoPublicacion,
    idUsuario,
  });
};

const findLatestHistoryVersion = async (idPublicacion) => {
  const historialPublicaciones = await HistorialPublicacion.findAll({
    attributes: ["version"],
    where: { idPublicacion: idPublicacion },
  });

  const versiones = historialPublicaciones.map((h) => h.version);

  const mayor = versiones.length > 0 ? Math.max(...versiones) : 0;

  return mayor;
};
