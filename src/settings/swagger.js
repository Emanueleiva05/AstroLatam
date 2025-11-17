import swaggerJSDoc from "swagger-jsdoc"; //Transforma los archivos YAML en documentación Swagger
import swaggerUi from "swagger-ui-express"; //Permite mostar ese JSON en una interfaz web
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
  apis: ["./src/routes/*.js"], //Rutas donde se encuentran los archivos con anotaciones Swagger,
});

export const swaggerDocs = (app, port) => {
  //Función para configurar Swagger en la aplicación Express
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Ruta donde se sirve la documentación Swagger
  console.log(
    `🚀 Swagger docs disponible en http://localhost:${port}/api/docs`
  );
};
