# Requerimientos

## Funcionales (RF)

RF01. Gestion de tipo (Solo el administrador)

- RF01.01 El administrador podra crear tipos teniendo un `nombre` obligatoriamente
- RF01.02 El administrador podra modificar tipos de adjuntos
- RF01.03 El administrador podra eliminar tipo de adjunto

RF02. Un usuario podra gestionar su perfil

- RF02.01 El usuario podra crear un perfil obligatoriamente agregara un `username`, `nombre`, `email`, `password` y `ciudad`
  - RF02.01.a El `email` y `username` deben ser unicos
- RF02.02 El usuario opcionalmente podra poner una `foto de perfil`, `numero` y `descripción`
  - RF02.02.a Se verificara que la `foto de perfil` sea de tipo `png` o `jpg`
- RF02.02. El usuario puede actualizar solo su perfil
- RF02.03. El usuario podra eliminar su perfil

RF03. El usuario podra gestionar sus instrumentos

- R03.F01. El usuario solo podra crear un instrumento propio
  - RF03.01.01. El usuario podra tener varios instrumentos a su nombre
- RF03.02. El usuario solo podra modificar un instrumento propio
- RF03.03. El usuario solo podra eliminar un instrumento propio
  - RF03.03.a No se pueden eliminar instrumentos con observaciones asociadas

RF04. El usuario podra gestionar sus publicaciones

- RF04.01. El usuario podra crear publicaciones obligatoriamente con un `tipoPublicacion`, `titulo` y `descripcion`
- RF04.02. El usuario podra modificar publicaciones propias
  - RF04.02.01. Al crear la publicacion se crea una version en `HistoriaPublicacion` con `version`, `fechaEdicion` y snapshot de los campos
- RF04.03. El usuario podra eliminar publicaciones propias
- RF04.04. La visibilidad de publicaciones podran ser `privada`, `miembros` y `publica`

RF05. El usuario podra gestionar sus observaciones

- RF05.01. El usuario podra crear observaciones propias donde obligatoriamente requiere `titulo`, `fechaObservacion`, `horaObservacion` y `idUbicacion`
  - RF05.01.a. Una observacion debe tener al menos 1 `objeto` o `evento`
  - RF05.01.b. Se pueden asociar 0 o mas instrumentos propios del usuario
  - RF05.01.c. Se pueden asociar 0 o mas condiciones de la observaciones
- RF05.02. El usuario podra modificar publicaciones propias
- RF05.03. El usuario podra eliminar publicaciones propias
- RF05.04. La visibilidad de observaciones podran ser `privada`, `miembros` y `publica`

RF06. El administrador podra gestionar los eventos

- RF06.01. El administrador podra crear el CRUD de eventos donde al crear se requiere (`nombre`,`descripcion`,`fechaInicio/Fin`,`horaInicio/Fin`,`idTipoEvento`)
- RF06.02. El usuario puede consultar eventos

RF07. El usuario podra reaccionar a las publicacion y observaciones

- RF07.01. El usuario podra crear el CRUD de reacciones (`like`,`comentario`,`reporte`) sobre `publicaciones` y `observaciones`

RF08 – Moderación de reportes (Admin/Moderador)

- RF08.01 Estados: enviada | en_revision | rechazada | aceptada.
- RF08.02 Listar solo enviada/en_revision.
- RF08.03 Ver contador de reportes por contenido.
- RF08.04 Auto-ocultar contenido cuando el contador alcanza N (default 5) de usuarios distintos.
- RF08.05 Moderador/Admin puede revertir el ocultamiento, dejando nota.
- RF08.06 No se cuentan múltiples reportes del mismo usuario sobre el mismo target.

RF09 – Filtro de observaciones

- RF09.01 Filtrar por pais, provincia, ciudad, instrumento, rolDelAutor.
- RF09.02 Paginación obligatoria (page, limit), orden por fechaObservacion desc por default.

RF10 – Visibilidad y acceso

- RF10.01 privada: solo autor + admin.
- RF10.02 miembros: usuarios autenticados.
- RF10.03 publica: cualquiera (incluye visitantes).

RF11 – Objetos más observados (ranking semanal)

- RF11.01 Endpoint que devuelve top objetos por cantidad de observaciones en semana ISO (o ?from=&to=).
- RF11.02 Debe permitir filtrar por país/provincia/ciudad.

RF12 – Usuarios más activos

- RF12.01 Puntaje: +3 publicacion, +4 observacion, +1 comentario/like, +2 reporte aceptado.
- RF12.02 Ranking por semana/mes; devolver top N (default 10).

RF13 – Configuración global (Admin)

- RF13.01 Cambiar N de auto-ocultado, límites de adjuntos por contenido, etc.`
- RF13.02 Efecto inmediato (desde la próxima operación).

## No funcionales (RNF)

RNF01 – Rendimiento

- RNF01.01 GET /observacion y filtros: p95 < 300ms con 10k filas y índices activos; p99 < 800ms.
- RNF01.02 Paginación obligatoria. limit por defecto 20, máximo 100.
- RNF01.03 Índices: nombre de país/provincia/ciudad, Usuarios.rol, Instrumentos.nombre.

RNF02 – Seguridad

- RNF02.01 Password con bcrypt/argon2 (work factor razonable).
- RNF02.02 Autenticación JWT o sesiones; expiración configurable; refresh opcional.
- RNF02.03 RBAC por rol y por recurso (autor puede ver su privado).
- RNF02.04 Rate-limit para comentar/reportar/like (anti-abuso).

RNF03 – Calidad de datos y tiempo

- RNF03.01 Guardar timestamps en UTC + TZ original cuando aplique.
- RNF03.02 Ubicaciones con lat/lon WGS84; para mostrar, redondeo configurable (privacidad).
- RNF03.03 Integridad referencial: sin “objetos sin referencia”.

RNF04 – Observabilidad

- RNF04.01 Logs estructurados con reqId por request.
- RNF04.02 Métricas: latencia p95/p99 por endpoint, tasa de error, % aciertos de caché (si aplicás).
- RNF04.03 Audit log para cambios de visibilidad/moderación.

RNF05 – Deploy y operabilidad

- RNF05.01 Docker + .env; /health y /ready.
- RNF05.02 Migraciones con sequelize-cli (sin sync({alter|force}) en prod).
- RNF05.03 Seeds idempotentes.

RNF06 – UX y resiliencia

- RNF06.01 Reintento seguro en acciones idempotentes (p.ej. like).
- RNF06.02 Si se corta la red, el cliente no pierde lo escrito (alcance mínimo: guardar borrador en cliente).

RNF07 – Mantenibilidad y calidad

- RNF07.01 OpenAPI en /docs, actualizado en cada cambio.
- RNF07.02 DoD: tests mínimos (happy/404/400) por endpoint, linters, sin TODOs.
- RNF07.03 README de “cómo levantar” + guía para capítulos locales.

RNF08 – Privacidad

- RNF08.01 Política de precisión de ubicación configurable (ciudad por defecto para perfiles).
- RNF08.02 Retención de datos de ubicación definida (p.ej. 12 meses) y documentada.
- RNF08.03 Borrado/anonimización bajo solicitud (cuando sea aplicable).
