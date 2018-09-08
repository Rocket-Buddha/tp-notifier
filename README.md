# Tecnicas avanzadas de programacion - Trabajo practico N° 1
[TOC]

## Resumen

## Deploy

```bash
docker build -t <tu_nombre>/tp-notifier .

docker run --security-opt apparmor:unconfined -p 8080:3000 -d <tu_nombre>/tp-notifier
```

## Testing

## Librerias utilizadas

## Arquitectura