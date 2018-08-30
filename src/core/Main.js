#!/usr/bin/env node

class Main {
  
  static main () {
    Main.setupAndStartServer();
    Main.setupEndPoints();
    Main.setupDB();
  }
  
  static setupAndStartServer() {
    //
    let express = require('express');
    let http = require('http');
    let app = express();
    let port = Main.normalizePort(process.env.PORT || '3000');
    let server;
    //
    app.set('port', port);
    server = http.createServer(Main.app);
    server.listen(port);
    server.on('error', Main.onError);
    server.on('listening', Main.onListening);
    //
    Main.app = app;
    Main.server = server;
  }

  static setupEndPoints(){
    Main.app.use('/users', require('../users/UsersController.js'));
  }

  static setupDB(){
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://yourMongoDBURIGoesHere');
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