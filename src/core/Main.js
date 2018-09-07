
const express = require('express');
const Mongoose = require('mongoose');
const Properties = require('../helpers/Properties.js');
const UserControllerSingleton = require('../users/UsersController');
const AuthControllerSingleton = require('../auth/AuthController.js');
const MessagesControllerSingleton = require('../messages/MessagesController.js');

/**
 * Clase Main para punto de entrada de la aplicacion.
 */
class Main {
  /**
   * Contructor de la clase Main.
   * @param {Number} pPort - Puerto con el que se configurara la app.
   */
  constructor(pPort) {
    this.setupApp(pPort);
    this.setupEndPoints();
    Main.setupDB();
  }

  /**
   * Metodo destinado a hacer las configuraciones de la app.
   */
  setupApp(pPort) {
    this.app = express();
    // Puerto.
    this.app.set('port', pPort);
  }

  /**
   * Metodo destinado a rutear todos los endpoint de la API.
   */
  setupEndPoints() {
    // Se debera aplicar una de estas lineas por cada endpoint.
    // Obtiene el singleton del controlador de usuarios y mapea su router en la app.
    this.app.use('/users', UserControllerSingleton.router);
    // Obtiene el singleton del controlador de autenticacion y mapea su router en la app.
    this.app.use('/authenticate', AuthControllerSingleton.router);
    // Obtiene el singleton del controlador de mensajes y mapea su router en la app.
    this.app.use('/messages', MessagesControllerSingleton.router);
  }

  /**
   * Metodo destinado a conectar la base de datos.
   */
  static setupDB() {
    Mongoose.connect(Main.buildConnectionString(), { useNewUrlParser: true },
      (err) => {
        if (err) throw err;
      });
  }

  /**
   * Metodo destinado a armar el string de conexion.
   * @return {String} Devuelve el String de conexion a MongoDB.
   */
  static buildConnectionString() {
    // Retorno el string armado.
    return `mongodb://${
      Properties.get('db.mongo.user')
    }:${
      Properties.get('db.mongo.pass')
    }@${
      Properties.get('db.mongo.host')
    }:${
      Properties.get('db.mongo.port')
    }/${
      Properties.get('db.mongo.schema')}`;
  }
}
module.exports = Main;
