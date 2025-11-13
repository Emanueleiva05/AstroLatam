#Imagen en la que se basara la nueva imagen
FROM node:18 

#Asigno la carpeta en donde se ejecutaran los comando
WORKDIR /app/

#Copio las depencias del proyecto y las instalo
COPY package*.json ./
RUN npm install

#Copio el proyecto entero y expongo el puerto
COPY . .
EXPOSE 3000

# Dar permisos al entrypoint
RUN chmod +x /app/entrypoint.sh

#Ejecuto el proyecto
ENTRYPOINT ["./entrypoint.sh" ]