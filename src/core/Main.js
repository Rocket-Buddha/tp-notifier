#!/usr/bin/env node

// Constante que guarda el file path a las properties.
const PROPERTIES_FILE_PATH = './env/app.properties';

// Clase Main para punto de entrada de la aplicacion.
// Tener en cuenta que desde un contexto estatico,
// solo puedo hacer uso de miembros que tambien son estaticos.
class Main {

  // Metodo main, punto de entrada. Ver ultima linea del archivo.
  static main() {
    Main.setupApp();
    Main.setupEndPoints();
    Main.setupAndStartServer();
    Main.setupDB();
  }

  // Metodo destinado a hacer las configuraciones de la app.
  static setupApp() {
    // Declaro e instancio properties. Un objeto que me permite manejar properties.
    Main.properties = require('properties-reader')(PROPERTIES_FILE_PATH);
    // Express config.
    let express = require('express');
    Main.app = express();
    // Puerto.
    Main.port = Main.normalizePort(process.env.PORT || '3000');
    Main.app.set('port', Main.port);
  }

  // Metodo detinado a configurar la app, el server y levantarlo.
  static setupAndStartServer() {
    Main.server = require('http').createServer(Main.app);
    Main.server.listen(Main.port);
    Main.server.on('error', Main.onError);
    Main.server.on('listening', Main.onListening);
  }

  // Metodo destinado a rutear todos los endpoint de la API.
  static setupEndPoints() {

    // Se debera aplicar una de estas lineas por cada endpoint.

    // Obtiene el singleton del controlador de usuarios y mapea su router en la app.
    Main.app.use('/users', require("../users/UsersController.js").router);

  }

  // Metodo destinado a conectar la base de datos.
  static setupDB() {
    let mongoose = require('mongoose');
    mongoose.connect(Main.buildConnectionString(), { useNewUrlParser: true },
      function (err) {
        if (err) throw err;
      });
  }

  // Metodo destinado a armar el string de conexion.
  static buildConnectionString() {
    
    return 'mongodb://'
      + Main.properties.get('db.mongo.user')
      + ':'
      + Main.properties.get('db.mongo.pass')
      + '@'
      + Main.properties.get('db.mongo.host')
      + ':'
      + Main.properties.get('db.mongo.port')
      + '/'
      + Main.properties.get('db.mongo.schema');

  }

  // Metodo para obtener el puerto, ya se configurado por defecto o desde una variable de entorno.
  static normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  // Callback de error al levantar el server.
  static onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  // Callback de server levantado.
  static onListening() {
    let debug = require('debug')('tp-notifier:server');
    let addr = Main.server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

}

// Linea de entrada del programa ;) . Ver package.json.
Main.main();