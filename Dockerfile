# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos fuente del proyecto al contenedor
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto que tu aplicación usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "./dist/index.js"]
