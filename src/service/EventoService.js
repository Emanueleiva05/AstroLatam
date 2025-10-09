import Evento from "../models/Evento.js";

export const AgregarEvento = async (
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  return await Evento.create({
    nombre: nombre,
    horaInicio: horaInicio,
    descripcion: descripcion,
    horaFin: horaFin,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    idTipoEvento: idTipoEvento,
  });
};

export const ModificarEvento = async (
  evento,
  nombre,
  descripcion,
  horaInicio,
  horaFin,
  fechaInicio,
  fechaFin,
  idTipoEvento
) => {
  evento.nombre = nombre;
  evento.descripcion = descripcion;
  evento.horaInicio = horaInicio;
  evento.horaFin = horaFin;
  evento.fechaInicio = fechaInicio;
  evento.fechaFin = fechaFin;
  evento.idTipoEvento = idTipoEvento;
  return await evento.save();
};

export const EliminarEvento = async (evento) => {
  return await evento.destroy();
};

export const ListarEventos = async () => {
  return await Evento.findAll();
};

export const ListarEvento = async (id) => {
  return await Evento.findByPk(id);
};
