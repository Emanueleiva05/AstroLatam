import swaggerJSDoc from "swagger-jsdoc"; //Transforma los archivos YAML en documentación Swagger
import swaggerUi from "swagger-ui-express"; //Permite mostar ese JSON en una interfaz web
import path from "path"; //Estos dos importes nos ayudan a resolver rutas de archivos
import { fileURLToPath } from "url";

const _dirname = path.dirname(fileURLToPath(import.meta.url));

//fileURLToPath(import.meta.url) nos da la ruta completa del archivo actual
//path.dirname(...) nos da el directorio que contiene ese archivo

//Configuración de Swagger

const swaggerSpec = swaggerJSDoc({
  //Construye el documento OpenAPI a partir de los archivos YAML
  definition: {
    //Bloque principal de la configuración de Swagger
    openapi: "3.0.0", //Versión de OpenAPI
    info: {
      //Información básica de la API
      title: "AstroLatam API", //Título de la API
      version: "1.0.0", //Versión de la API
      description: "Documentación de la API de AstroLatam", //Descripción de la API
    },
    servers: [
      //Servidores donde está alojada la API
      {
        url: "http://localhost:3000/api", //URL del servidor local
      },
    ],
  },
  apis: [
    //Rutas a los archivos YAML que contienen la documentación de la API
    path.join(_dirname, "../docs/schemas/*.yaml"), //Esquemas de datos
    path.join(_dirname, "../docs/paths/*.yaml"), //Rutas de la API
  ],
});

export const swaggerDocs = (app, port) => {
  //Función para configurar Swagger en la aplicación Express
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Ruta donde se sirve la documentación Swagger
  console.log(
    `🚀 Swagger docs disponible en http://localhost:${port}/api/docs`
  );
};
