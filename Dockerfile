#####################################################################
# Container para buildear el container final.
FROM node:10.10.0-jessie AS builder

# Directorio de la aplicacion.
WORKDIR /tmp/tap/tp-notifier/src

# Copia el contenido del proyecto en el container.
# Salvo lo que se marco en el .dockerignore.
COPY . .

# Flags para instalacion de librerias solo de prod.
RUN npm install --only=production
#####################################################################
# Container final liviano.
FROM node:10-alpine

# Directorio de la aplicacion.
WORKDIR /opt/tap/tp-notifier

# Copio el output del builder al container final.
COPY --from=builder .

# Git para poder hacer deploy automatizado.
RUN apk add --no-cache git

# Variables de entorno.
# Variable de entorno. PM2 se ocupa de esto,
# pero la seteamos por las dudas.
ENV NODE_ENV production
# Puerto que tomara node como puerto por defecto.
ENV PORT 8080

# Puerto expuesto por el contenedor.
EXPOSE 8080

# Levanto la aplicacion pero con PM2 (node_modules para ni instalarlo grlobal) para produccion.
CMD [ "node_modules/.bin/pm2", "start", "--env production"]
#####################################################################