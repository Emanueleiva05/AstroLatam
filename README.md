# ⭐ AstroLatam – Plataforma de Observación Astronómica Colaborativa

## 🌌 Descripción

AstroLatam es una plataforma donde astrónomos y aficionados pueden registrar observaciones del cielo, crear publicaciones, reaccionar, comentar, reportar y consultar eventos astronómicos, todo dentro de una comunidad colaborativa.

El backend está desarrollado en Node.js + Express, con Sequelize como ORM, JWT para autenticación, Redis para cache y optimización de consultas, y soporte para despliegue en Docker.

---

## 🚀 Características principales

- Sistema de usuarios con roles: Aficionado, Astrónomo, Moderador, Administrador
- Creación, edición y eliminación de publicaciones
- Creación, edición y eliminación de observaciones
- Sistema global de adjuntos (imágenes, videos, archivos)
- Historial de modificaciones en publicaciones
- Moderación avanzada de reportes
- Auto-ocultamiento de contenido por reportes
- Filtrado avanzado de observaciones (país, provincia, ciudad, instrumento, rol del observador)
- Paginación + cache optimizado con Redis
- Logs estructurados con Winston

## 🧱 Arquitectura del proyecto

```
/migrations
/seeds
/src
    /controllers        → Manejo de endpoints
    /middlewares        → Validaciones y control de acceso
    /models             → Definición de entidades/relaciones
    /routes             → Rutas agrupadas por recursos
    /service            → Lógica de negocio
    /setting            → Configuración (DB, Redis)
    /utils              → Logs, roles, manejo de errores, helpers
index.js
Dockerfile
```

La arquitectura sigue un modelo por capas, separando responsabilidades y manteniendo el proyecto escalable y mantenible.

## 🛠️ Tecnologías utilizadas

- Node.js + Express
- MySQL
- Sequelize ORM
- Redis (Cache)
- Docker
- JWT
- Winston (logging)

## ⚙️ Instalación y configuración

1. Clonar repositorio

```bash
git clone https://github.com/Emanueleiva05/AstroLatam.git
cd AstroLatam
```

2. Variables de entorno

Crear archivo .env:

```
DB_USER=
MYSQL_PWD=
PORT=
MYSQL_HOST=
DB_NAME=
JWT_SECRET=
REDIS_HOST=
REDIS_PORT=
```

3. Instalar dependencias

```bash
npm install
```

4. Migraciones y seeds

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. Iniciar servidor

```bash
npm start
```

## 🔐 Autenticación y roles

- JWT almacenado en cookies httpOnly
- Login, registro y logout
- Rutas protegidas por:
  - verifyRequiredToken
  - verifyOptionalToken
  - tieneRol("...")
  - verifyUserOwnership (para asegurar que un usuario solo modifica lo suyo)

Endpoints principales:

```
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/protected
```

---

## 🔎 Documentación de API

La API esta completamente documentada utilizando Swagger / OpenAPI 3.0
Podes acceder a la interfaz interactiva en:

```
GET /api/docs
```

La documentacion incluye:

- Rutas completas de todos los modulos del sistema
- Ejemplos de request/response
- Autenticacion y seguridad (JWT + Roles)
- Esquema de datos
- Relaciones entre entidades
- Codigos de error
- Paginacion + filstros

---

## 🐞 Errores conocidos (Issues actuales)

### 🔧 1. Filtrado por ubicación en Observaciones

- Problema: El include + where de Sequelize no filtra correctamente cuando hay múltiples niveles (Ciudad → Provincia → País).
- Estado: Pendiente
- Impacto: Devuelve todas las observaciones aunque se pase ?pais= o ?ciudad=
- Plan: Rehacer el filtrado con raw query optimizada o include con required anidados.

---

### 🔧 4. Validación de adjuntos

- Problema: Acepta tipos sin control estricto.
- Estado: Pendiente
- Plan: Validar extensiones MIME y tamaño.

---

### 🔧 5. Filtrado de observaciones por instrumento

- Problema: Funciona pero no incluye required bien en todos los niveles.
- Estado: Pendiente
- Plan: Revisar include + through.

---

### 🔧 6. JWT expira pero cookie permanece

- Problema: Cookie no se limpia automáticamente.
- Estado: Pendiente
- Plan: En logout, setear cookie expirando inmediatamente.

---

### 🔧 10. Control de ownership en publicaciones/observaciones

- Problema: Middleware implementado, pero requiere mejoras en robustez.
- Estado: Implementado pero a revisar
- Plan: Validar que el usuario logueado coincide con resource.idUsuario.

---

### 🔧 11. Falta indexar logs por request ID

- Estado: Pendiente
- Plan: Añadir correlación entre logs y request mediante unique ID.

---

### 🔧 12. Seeds dependientes del orden

- Problema: Seeds dependen del orden de IDs generados.
- Estado: Pendiente
- Plan: Reescribir seeds creando dependencias explícitas.

---

# 🤝 Contribuciones

Si encontrás bugs, inconsistencias o mejoras:
Abrí un issue en GitHub describiendo el problema.
Toda ayuda es bienvenida.
