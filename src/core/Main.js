const fs = require('fs');
const helmet = require('helmet');
const express = require('express');
const uuidv1 = require('uuid/v1');
const Mongoose = require('mongoose');
const Properties = require('../helpers/Properties.js');
const UserControllerSingleton = require('../users/UsersController');
const AuthControllerSingleton = require('../auth/AuthController');
const MessagesControllerSingleton = require('../messages/MessagesController');
const StatusControllerSingleton = require('../status/StatusController');

/**
 * Clase Main para punto de entrada de la aplicacion.
 */
class Main {
  /**
   * Contructor de la clase Main.
   * @param {Number} pPort - Puerto con el que se configurara la app.
   */
  constructor(pPort) {
    Main.setupLogFolder();
    this.setupApp(pPort);
    this.setupEndPoints();
    Main.setupDB();
  }

  /**
   * Metodo que crea la carpeta de logging si esta no existe.
   */
  static setupLogFolder() {
    if (!fs.existsSync(Properties.get('logging.path'))) {
      fs.mkdirSync(Properties.get('logging.path'));
    }
  }

  /**
   * Metodo destinado a hacer las configuraciones de la app.
   */
  setupApp(pPort) {
    this.app = express();
    // El segundo middleware que se ejecuta es el que setea el TUId.
    this.app.use((req, res, next) => { Main.addTransactionUniqueId(req, res, next); });
    // Helmet por seguridad.
    this.app.use(helmet());
    // Puerto.
    this.app.set('port', pPort);
  }

  /**
   * Metodo encargado de establecer un correlational id.
   * No se usa httpContext de express por que pierde el contextos en ciertos callbacks.
   * @param {Request} req - Request de entrada.
   * @param {Response} res - Response de salida.
   * @param {Function} next - Funcion que llama a la siguiente funcion middleware.
   */
  static addTransactionUniqueId(req, res, next) {
    if (req.headers['correlational-id']) {
      res.set('correlationalId', req.headers['correlational-id']);
    } else {
      res.set('correlationalId', uuidv1());
    }
    next();
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
    // Obtiene el singleton del controlador de status.
    this.app.use('/status', StatusControllerSingleton.router);
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
