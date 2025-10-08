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

Adjunto.belongsToMany(Evento, { through: "EventoAdjunto" });

Adjunto.belongsToMany(Objeto, { through: "ObjetoAdjunto" });

Adjunto.belongsToMany(Observacion, { through: "ObservacionAdjunto" });

//Ciudad
Ciudad.belongsTo(Provincia, { foreignKey: "idProvincia" });
Provincia.hasMany(Ciudad, { foreignKey: "idProvincia" });

//Instrumento
TipoInstrumento.hasMany(Instrumento, { foreignKey: "idTipoInstrumento" });
Instrumento.belongsTo(TipoInstrumento, { foreignKey: "idTipoInstrumento" });

Instrumento.belongsToMany(Usuario, { through: "InstrumentoUsuario" });

Instrumento.belongsToMany(Observacion, { through: "ObservacionInstrumento" });

//Objeto
Objeto.belongsTo(TipoObjeto, { foreignKey: "idTipoObjeto" });
TipoObjeto.hasMany(Objeto, { foreignKey: "idTipoObjeto" });

Objeto.belongsToMany(Evento, { through: "EventoObjeto" });

Objeto.belongsToMany(Adjunto, { through: "ObjetoAdjunto" });

Objeto.belongsToMany(Observacion, { through: "ObjetoObservacion" });

//Observacion
Observacion.belongsTo(Ubicacion, { foreignKey: "idUbicacion" });
Ubicacion.hasMany(Observacion, { foreignKey: "idUbicacion" });

Observacion.belongsToMany(Objeto, { through: "ObjetoObservacion" });

Observacion.belongsToMany(Adjunto, { through: "ObservacionAdjunto" });

Observacion.belongsToMany(Evento, { through: "ObservacionEvento" });

Observacion.belongsToMany(Instrumento, { through: "ObservacionInstrumento" });

//ObservacionCondicion
ObservacionCondicion.belongsTo(Observacion, { foreignKey: "idObservacion" });
Observacion.hasMany(ObservacionCondicion, { foreignKey: "idObservacion" });

ObservacionCondicion.belongsTo(TipoCondicion, {
  foreignKey: "idTipoCondicion",
});
TipoCondicion.hasMany(ObservacionCondicion, { foreignKey: "idTipoCondicion" });

//Pais
Pais.belongsToMany(Evento, { through: "EventoPais" });

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

Evento.belongsToMany(Pais, { through: "EventoPais" });

Evento.belongsToMany(Objeto, { through: "EventoObjeto" });

Evento.belongsToMany(Adjunto, { through: "EventoAdjunto" });

Evento.belongsToMany(Observacion, { through: "ObservacionEvento" });

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
