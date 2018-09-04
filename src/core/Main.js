#!/usr/bin/env node

// Tener en cuenta que desde un contexto estatico,
// solo puedo hacer uso de miembros que tambien son estaticos.

/** 
 * Clase Main para punto de entrada de la aplicacion. 
 */
class Main {

  /**
   * Metodo main, punto de entrada. Ver ultima linea del archivo.
   */
  static main() {
    Main.setupApp();
    Main.setupEndPoints();
    Main.setupAndStartServer();
    Main.setupDB();
  }

  /**
   * Metodo destinado a hacer las configuraciones de la app.
   */
  static setupApp() {
    // Express config.
    let express = require('express');
    Main.app = express();
    // Puerto.
    Main.port = Main.normalizePort(process.env.PORT || '3000');
    Main.app.set('port', Main.port);
  }

  /**
   * Metodo detinado a configurar la app, el server y levantarlo.
   */
  static setupAndStartServer() {
    Main.server = require('http').createServer(Main.app);
    Main.server.listen(Main.port);
    Main.server.on('error', Main.onError);
    Main.server.on('listening', Main.onListening);
  }

  /**
   * Metodo destinado a rutear todos los endpoint de la API.
   */
  static setupEndPoints() {
    // Se debera aplicar una de estas lineas por cada endpoint.
    // Obtiene el singleton del controlador de usuarios y mapea su router en la app.
    Main.app.use('/users', require("../users/UsersController.js").router);
    // Obtiene el singleton del controlador de autenticacion y mapea su router en la app.
    Main.app.use('/authenticate', require("../auth/AuthController.js").router);
    // Obtiene el singleton del controlador de mensajes y mapea su router en la app.
    Main.app.use('/messages', require("../messages/MessagesController.js").router);

  }

  /**
   * Metodo destinado a conectar la base de datos.
   */
  static setupDB() {
    let mongoose = require('mongoose');
    mongoose.connect(Main.buildConnectionString(), { useNewUrlParser: true },
      function (err) {
        if (err) throw err;
      });
  }

  /**
   * Metodo destinado a armar el string de conexion.
   * @return {String} Devuelve el String de conexion a MongoDB.
   */
  static buildConnectionString() {
    // Traigo el Singleton de properties.
    let properties = require('../helpers/Properties.js');
    // Retorno el string armado.
    return 'mongodb://'
      + properties.get('db.mongo.user')
      + ':'
      + properties.get('db.mongo.pass')
      + '@'
      + properties.get('db.mongo.host')
      + ':'
      + properties.get('db.mongo.port')
      + '/'
      + properties.get('db.mongo.schema');

  }

  /**
   * Metodo para normalizar el valor del puerto.
   * @param {Boolean} val  - Valor del puerto.
   * @return {*} Puede devolver el valor del puerto o false si no fue posible la normalizacion.
   */
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

  /**
   * Callback de error al levantar el server.
   * @param {Error} error
   * @return {Error} Error mas especifico devuelta.
   */
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

  /**
   * Callback de server levantado.
   */
  static onListening() {
    let debug = require('debug')('tp-notifier:server');
    let addr = Main.server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  /**
   * Metodo invocado para apagar el servidor.
   */
  static serverClose(){
    this.server.close();
  }

}

// Linea de entrada del programa ;) . Ver package.json.
Main.main();

// Export de Main para Jasmine.
module.exports = Main;