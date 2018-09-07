#!/usr/bin/env node
const debug = require('debug')('tp-notifier:server');
const Http = require('http');
const Main = require('../../src/core/Main');


/**
 * Clase estatica de manager del server.
 */
class ServerManager {
  /**
  * Metodo run para levantar el servidor.
  */
  static run() {
    ServerManager.port = ServerManager.normalizePort(process.env.PORT || '3000');
    ServerManager.main = new Main(ServerManager.port);
    ServerManager.myServer = Http.createServer(ServerManager.main.app);
    ServerManager.myServer.listen(ServerManager.port);
    ServerManager.myServer.on('error', ServerManager.onError);
    ServerManager.myServer.on('listening', ServerManager.onListening);
  }

  /**
    * Metodo para normalizar el valor del puerto.
    * @param {Boolean} val  - Valor del puerto.
    * @return {*} Puede devolver el valor del puerto o false si no fue posible la normalizacion.
    */
  static normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
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
    const bind = typeof ServerManager.port === 'string'
      ? `Pipe ${ServerManager.port}`
      : `Port ${ServerManager.port}`;
    switch (error.code) {
      case 'EACCES':
        debug(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        debug(`${bind} is already in use`);
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
    const addr = ServerManager.myServer.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }

  /**
    * Metodo invocado para apagar el servidor.
    */
  static serverClose() {
    ServerManager.myServer.close();
  }
}
// Levanta el servidor
ServerManager.run();

module.exports = ServerManager;
