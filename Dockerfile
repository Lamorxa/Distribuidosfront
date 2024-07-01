# Usa una imagen base de Node.js para construir y servir la aplicación
FROM node:14

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala una versión específica de npm
RUN npm install -g npm@6.14.15

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del proyecto en el contenedor
COPY . .

# Construye la aplicación React para producción
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la aplicación construida en el directorio de Nginx
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
