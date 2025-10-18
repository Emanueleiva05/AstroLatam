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

//AccionUsuario

AccionUsuario.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(AccionUsuario, { foreignKey: "idUsuario" });

//Adjunto

Adjunto.belongsTo(TipoAdjunto, { foreignKey: "idTipoAdjunto" });
TipoAdjunto.hasMany(Adjunto, { foreignKey: "idTipoAdjunto" });

Adjunto.belongsToMany(Evento, { through: "EventoAdjunto", timestamps: false });

Adjunto.belongsToMany(Objeto, { through: "ObjetoAdjunto", timestamps: false });

Adjunto.belongsToMany(Observacion, {
  through: "ObservacionAdjunto",
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
  timestamps: false,
});

Instrumento.belongsToMany(Observacion, {
  through: "ObservacionInstrumento",
  timestamps: false,
});

//Objeto
Objeto.belongsTo(TipoObjeto, { foreignKey: "idTipoObjeto" });
TipoObjeto.hasMany(Objeto, { foreignKey: "idTipoObjeto" });

Objeto.belongsToMany(Evento, { through: "EventoObjeto", timestamps: false });

Objeto.belongsToMany(Adjunto, { through: "ObjetoAdjunto", timestamps: false });

Objeto.belongsToMany(Observacion, {
  through: "ObjetoObservacion",
  timestamps: false,
});

//Observacion
Observacion.belongsTo(Ubicacion, { foreignKey: "idUbicacion" });
Ubicacion.hasMany(Observacion, { foreignKey: "idUbicacion" });

Observacion.belongsToMany(Objeto, {
  through: "ObjetoObservacion",
  timestamps: false,
});

Observacion.belongsToMany(Adjunto, {
  through: "ObservacionAdjunto",
  timestamps: false,
});

Observacion.belongsToMany(Evento, {
  through: "ObservacionEvento",
  timestamps: false,
});

Observacion.belongsToMany(Instrumento, {
  through: "ObservacionInstrumento",
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
Pais.belongsToMany(Evento, { through: "EventoPais", timestamps: false });

//Provincia
Provincia.belongsTo(Pais, { foreignKey: "idPais" });
Pais.hasMany(Provincia, { foreignKey: "idPais" });

//Publicacion
Publicacion.belongsTo(TipoPublicacion, { foreignKey: "idTipoPublicacion" });
TipoPublicacion.hasMany(Publicacion, { foreignKey: "idTipoPublicacion" });

Publicacion.belongsTo(Usuario, { foreignKey: "idUsuario" });
Usuario.hasMany(Publicacion, { foreignKey: "idUsuario" });

//Ubicacion
Ubicacion.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Ubicacion, { foreignKey: "idCiudad" });

//Usuario
Usuario.belongsTo(Ciudad, { foreignKey: "idCiudad" });
Ciudad.hasMany(Usuario, { foreignKey: "idCiudad" });

Usuario.belongsTo(Adjunto, { foreignKey: "idAdjunto" });
Adjunto.hasOne(Usuario, { foreignKey: "idAdjunto" });

Usuario.belongsToMany(Instrumento, { through: "InstrumentoUsuario" });

//Evento
Evento.belongsTo(TipoEvento, { foreignKey: "idTipoEvento" });
TipoEvento.hasMany(Evento, { foreignKey: "idTipoEvento" });

Evento.belongsToMany(Pais, { through: "EventoPais", timestamps: false });

Evento.belongsToMany(Objeto, { through: "EventoObjeto", timestamps: false });

Evento.belongsToMany(Adjunto, { through: "EventoAdjunto", timestamps: false });

Evento.belongsToMany(Observacion, {
  through: "ObservacionEvento",
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
