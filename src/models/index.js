import AccionUsuario from "./AccionUsuario.js";
import Adjunto from "./Adjunto.js";
import Ciudad from "./Ciudad.js";
import Evento from "./Evento.js";
import Instrumento from "./Instrumento.js";
import Objeto from "./Objeto.js";
import Observacion from "./Observacion.js";
import ObservacionCondicion from "./ObservacionCondicion.js";
import Pais from "./Pais.js";
import Provincia from "./Provincia.js";
import Publicacion from "./Publicacion.js";
import TipoAdjunto from "./TipoAdjunto.js";
import TipoCondicion from "./TipoCondicion.js";
import TipoEvento from "./TipoEvento.js";
import TipoInstrumento from "./TipoInstrumento.js";
import TipoObjeto from "./TipoObjeto.js";
import TipoPublicacion from "./TipoPublicacion.js";
import Ubicacion from "./Ubicacion.js";
import Usuario from "./Usuario.js";
import HistorialPublicacion from "./HistorialPublicacion.js";

//AccionUsuario

AccionUsuario.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(AccionUsuario, { foreignKey: "idUsuario" });

//Adjunto

Adjunto.belongsTo(TipoAdjunto, { foreignKey: "idTipoAdjunto" });
TipoAdjunto.hasMany(Adjunto, { foreignKey: "idTipoAdjunto" });

Adjunto.belongsToMany(Evento, {
  through: "EventoAdjunto",
  foreignKey: "idAdjunto",
  timestamps: false,
});

Adjunto.belongsToMany(Objeto, {
  through: "ObjetoAdjunto",
  foreignKey: "idAdjunto",
  timestamps: false,
});

Adjunto.belongsToMany(Observacion, {
  through: "ObservacionAdjunto",
  foreignKey: "idAdjunto",
  timestamps: false,
});

//Ciudad
Ciudad.belongsTo(Provincia, { foreignKey: "idProvincia" });
Provincia.hasMany(Ciudad, { foreignKey: "idProvincia" });

//Instrumento
TipoInstrumento.hasMany(Instrumento, { foreignKey: "idTipoInstrumento" });
Instrumento.belongsTo(TipoInstrumento, { foreignKey: "idTipoInstrumento" });

Instrumento.belongsToMany(Usuario, {
  through: "InstrumentoUsuario",
  foreignKey: "idInstrumento",
  timestamps: false,
});

Instrumento.belongsToMany(Observacion, {
  through: "ObservacionInstrumento",
  foreignKey: "idInstrumento",
  timestamps: false,
});

//Objeto
Objeto.belongsTo(TipoObjeto, { foreignKey: "idTipoObjeto" });
TipoObjeto.hasMany(Objeto, { foreignKey: "idTipoObjeto" });

Objeto.belongsToMany(Evento, {
  through: "EventoObjeto",
  foreignKey: "idObjeto",
  timestamps: false,
});

Objeto.belongsToMany(Adjunto, {
  through: "ObjetoAdjunto",
  foreignKey: "idObjeto",
  timestamps: false,
});

Objeto.belongsToMany(Observacion, {
  through: "ObjetoObservacion",
  foreignKey: "idObjeto",
  timestamps: false,
});

//Observacion
Observacion.belongsTo(Ubicacion, { foreignKey: "idUbicacion" });
Ubicacion.hasMany(Observacion, { foreignKey: "idUbicacion" });

Observacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(Observacion, { foreignKey: "idUsuario" });

Observacion.belongsToMany(Objeto, {
  through: "ObjetoObservacion",
  foreignKey: "idObservacion",
  timestamps: false,
});

Observacion.belongsToMany(Adjunto, {
  through: "ObservacionAdjunto",
  foreignKey: "idObservacion",
  timestamps: false,
});

Observacion.belongsToMany(Evento, {
  through: "ObservacionEvento",
  foreignKey: "idObservacion",
  timestamps: false,
});

Observacion.belongsToMany(Instrumento, {
  through: "ObservacionInstrumento",
  foreignKey: "idObservacion",
  timestamps: false,
});

//ObservacionCondicion
ObservacionCondicion.belongsTo(Observacion, { foreignKey: "idObservacion" });
Observacion.hasMany(ObservacionCondicion, { foreignKey: "idObservacion" });

ObservacionCondicion.belongsTo(TipoCondicion, {
  foreignKey: "idTipoCondicion",
});
TipoCondicion.hasMany(ObservacionCondicion, { foreignKey: "idTipoCondicion" });

//Pais
Pais.belongsToMany(Evento, {
  through: "EventoPais",
  foreignKey: "idPais",
  timestamps: false,
});

//Provincia
Provincia.belongsTo(Pais, { foreignKey: "idPais" });
Pais.hasMany(Provincia, { foreignKey: "idPais" });

//Publicacion
Publicacion.belongsTo(TipoPublicacion, { foreignKey: "idTipoPublicacion" });
TipoPublicacion.hasMany(Publicacion, { foreignKey: "idTipoPublicacion" });

Publicacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(Publicacion, { foreignKey: "idUsuario" });

//HistorialPublicacion

HistorialPublicacion.belongsTo(TipoPublicacion, {
  foreignKey: "idTipoPublicacion",
});
TipoPublicacion.hasMany(HistorialPublicacion, {
  foreignKey: "idTipoPublicacion",
});

HistorialPublicacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(HistorialPublicacion, { foreignKey: "idUsuario" });

HistorialPublicacion.belongsTo(Publicacion, { foreignKey: "idPublicacion" });
Publicacion.hasMany(HistorialPublicacion, { foreignKey: "idPublicacion" });

//Ubicacion
Ubicacion.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Ubicacion, { foreignKey: "idCiudad" });

//Usuario
Usuario.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Usuario, { foreignKey: "idCiudad" });

Usuario.belongsTo(Adjunto, { foreignKey: "idAdjunto" });
Adjunto.hasOne(Usuario, { foreignKey: "idAdjunto" });

Usuario.belongsToMany(Instrumento, {
  through: "InstrumentoUsuario",
  timestamps: false,
  foreignKey: "idUsuario",
});

//Evento
Evento.belongsTo(TipoEvento, { foreignKey: "idTipoEvento" });
TipoEvento.hasMany(Evento, { foreignKey: "idTipoEvento" });

Evento.belongsToMany(Pais, {
  through: "EventoPais",
  foreignKey: "idEvento",
  timestamps: false,
});

Evento.belongsToMany(Objeto, {
  through: "EventoObjeto",
  foreignKey: "idEvento",
  timestamps: false,
});

Evento.belongsToMany(Adjunto, {
  through: "EventoAdjunto",
  foreignKey: "idEvento",
  timestamps: false,
});

Evento.belongsToMany(Observacion, {
  through: "ObservacionEvento",
  foreignKey: "idEvento",
  timestamps: false,
});

export {
  AccionUsuario,
  Ciudad,
  Evento,
  Instrumento,
  Objeto,
  Observacion,
  ObservacionCondicion,
  Pais,
  Provincia,
  Publicacion,
  TipoAdjunto,
  TipoCondicion,
  TipoEvento,
  TipoInstrumento,
  TipoObjeto,
  TipoPublicacion,
  Ubicacion,
  Usuario,
};
