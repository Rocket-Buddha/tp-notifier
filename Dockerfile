#####################################################################
# Container para buildear el container final.
FROM node:10.10.0-stretch AS builder

# Directorio de la aplicacion.
WORKDIR /tmp/tap/tp-notifier/src/

# Copia el contenido del proyecto en el container.
# Salvo lo que se marco en el .dockerignore.
COPY . .

# Flags para instalacion de librerias solo de prod.
RUN npm install --only=production
#####################################################################
# Container final sin librerias de desarrollo.
FROM keymetrics/pm2:latest-stretch

# Directorio de la aplicacion.
WORKDIR /opt/tap/tp-notifier

# Copio el output del builder al container final.
COPY --from=builder /tmp/tap/tp-notifier/src/ /opt/tap/tp-notifier/

# Git para poder hacer deploy automatizado.
RUN apt-get install -y git

# Variables de entorno.
# Variable de entorno. PM2 se ocupa de esto,
# pero la seteamos por las dudas.
ENV NODE_ENV production
# Nivel de loggin maximo.
ENV NPM_CONFIG_LOGLEVEL info
# Puerto que tomara node como puerto por defecto.
ENV PORT 8080

# Puerto expuesto por el contenedor para la API.
EXPOSE 8080

# Puerto de monitoreo
EXPOSE 9615

# Levanto la aplicacion pero con PM2 (node_modules para ni instalarlo grlobal) para produccion.
CMD ["pm2-runtime", "--env", "production", "start", "ecosystem.config.js", "--web"]
#####################################################################