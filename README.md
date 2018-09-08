# Tecnicas avanzadas de programacion - Trabajo practico N° 1
[TOC]

## Resumen

### Arquitectura

### Librerias utilizadas

## Testing

## Deploy en prod manual

Parado en cualquier carpeta:

```bash
git clone https://github.com/Rocket-Buddha/tp-notifier.git
cd tp-notifier
```

Para buildear en el contenedor, parado en el root del proyecto.

```bash
docker build -t tap/tp-notifier .
```

Una vez generado hay que levantarlo. Podes configurar el puerto que quieras dependiendo de tu despliegue en prod.
En este ejemplo todos las conexiones entrantes al puerto 49568 se fowardiaran al puerto 8080 del contenedor, en donde corre la app.

```bash
docker run --security-opt apparmor:unconfined -p 49568:3000 -d tap/tp-notifier
```

Para ambientes productivos es mas recomendable:

```bash
docker run -p 49568:3000 -d tap/tp-notifier
```

### Helpers

Para poder revisar el contenedor:

```bash
sudo docker exec -i -t <container_id> /bin/bash
```

Borrrar todos los contenedores:

```bash
docker rm $(docker ps -a -q)
```

Borrar todas las imagenes:

```bash
docker rmi $(docker images -q)
```

Una vez finalizadas las tareas de deploy:

```bash
cd ..
rm -f /tp-notifier
```