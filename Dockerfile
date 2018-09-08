FROM node:10.10.0-jessie

# Directorio de la aplicacion.
WORKDIR /opt/tap/tp-notifier-v0.9

# Variables de entorno.
ENV NODE_ENV production
ENV PORT 8080

# Copia el contenido del proyecto en el container.
# Salvo lo que se marco en el .dockerignore.
COPY . .

# Flags para instalacion de librerias solo de prod.
RUN npm install --only=production

EXPOSE 8080
CMD [ "npm", "start" ]