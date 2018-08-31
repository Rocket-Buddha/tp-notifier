#!/usr/bin/env node

class Main {
  
  static main () {
    Main.setupApp();
    Main.setupEndPoints();
    Main.setupAndStartServer();
    Main.setupDB();
  }

  static setupApp(){
    let express = require('express');
    Main.app = express();
    Main.port = Main.normalizePort(process.env.PORT || '3000');
    Main.app.set('port', Main.port);
  }
  
  static setupAndStartServer() {
    Main.server = require('http').createServer(Main.app);
    Main.server.listen(Main.port);
    Main.server.on('error', Main.onError);
    Main.server.on('listening', Main.onListening);
  }

  static setupEndPoints(){
    //
    let userController = require("../users/UsersController.js");
    userController.model = require("../users/UsersModel.js");
    Main.app.use('/users', userController.router);
  }

  static setupDB(){
    //let mongoose = require('mongoose');
    //mongoose.connect('mongodb://yourMongoDBURIGoesHere');
  }

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

  static onListening() {
    let debug = require('debug')('tp-notifier:server');
    let addr = Main.server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}

Main.main();