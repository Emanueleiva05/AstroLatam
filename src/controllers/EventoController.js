import {
  AgregarEvento,
  EliminarEvento,
  ModificarEvento,
  ListarEventos,
  AgregarAdjunto,
  EliminarAdjunto,
  AgregarObjeto,
  EliminarObjeto,
  AgregarPais,
  EliminarPais,
  ListarAdjuntos,
  ListarPaises,
  ListarObjetos,
} from "../service/EventoService.js";

export const SetEvento = async (req, res, next) => {
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;
  try {
    await AgregarEvento(
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(201).json({ message: "Evento creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateEvento = async (req, res, next) => {
  const evento = req.evento;
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;

  try {
    await ModificarEvento(
      evento,
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(204).json({ message: "Evento modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteEvento = async (req, res, next) => {
  const evento = req.evento;
  try {
    await EliminarEvento(evento);
    res.status(204).json({ message: "Evento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadEvento = async (req, res, next) => {
  try {
    const eventos = await ListarEventos();
    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
};

export const ReadEventoEspecifico = async (req, res, next) => {
  const evento = req.evento;
  try {
    const eve = evento;
    res.status(200).json(eve);
  } catch (error) {
    next(error);
  }
};

export const SetAdjunto = async (req, res, next) => {
  try {
    await AgregarAdjunto(req.evento, req.adjunto);
    res.status(201).json({ message: "Se agrego el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const RemoveAdjunto = async (req, res, next) => {
  try {
    await EliminarAdjunto(req.evento, req.adjunto);
    res.status(204).json({ message: "Se elimino el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const SetPais = async (req, res, next) => {
  try {
    await AgregarPais(req.evento, req.pais);
    res.status(201).json({ message: "Se agrego el pais con exito" });
  } catch (error) {
    next(error);
  }
};

export const RemovePais = async (req, res, next) => {
  try {
    await EliminarPais(req.evento, req.pais);
    res.status(204).json({ message: "Se elimino el pais con exito" });
  } catch (error) {
    next(error);
  }
};

export const SetObjeto = async (req, res, next) => {
  try {
    await AgregarObjeto(req.evento, req.objeto);
    res.status(201).json({ message: "Se agrego el objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const RemoveObjeto = async (req, res, next) => {
  try {
    await EliminarObjeto(req.evento, req.objeto);
    res.status(204).json({ message: "Se elimino el objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntos = async (req, res, next) => {
  try {
    const adjuntos = await ListarAdjuntos(req.evento);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntoEspecifico = async (req, res, next) => {
  try {
    res.status(200).json(req.adjunto);
  } catch (error) {
    next(error);
  }
};

export const ReadPaises = async (req, res, next) => {
  try {
    const paises = await ListarPaises(req.evento);
    res.status(200).json(paises);
  } catch (error) {
    next(error);
  }
};

export const ReadPaisEspecifico = async (req, res, next) => {
  try {
    res.status(200).json(req.pais);
  } catch (error) {
    next(error);
  }
};

export const ReadObjetos = async (req, res, next) => {
  try {
    const objetos = await ListarObjetos(req.evento);
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const ReadObjetoEspecifico = async (req, res, next) => {
  try {
    res.status(200).json(req.objeto);
  } catch (error) {
    next(error);
  }
};
