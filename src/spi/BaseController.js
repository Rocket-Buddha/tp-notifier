const express = require('express');
const bodyParser = require('body-parser');
// Helper de loggin.
const Logguer = require('../helpers/Logguer');

/**
 * Clase abstracta BaseController.
 */
class BaseController {
  /**
   * Constructor de la clase de controlador base.
   */
  constructor() {
    // Evita que se instancie la clase BaseController.
    if (new.target === BaseController) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    // Declaracion e instanciacion del atributo router.
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());
    // Llamado al metodo destinado a ser implementado por el subtipo.
    // Este metodo es el que buildea las rutas especificas del controlador.
    this.buildRouter();
  }

  /**
   * Metodo abstracto a ser implementado por el subtipo con el buildeo de rutas especifico.
   */
  static buildRouter() {
    throw new Error('You have to implement the method build router in your own extended class!');
  }

  /**
   * Metodo para responder que el request enviado es invalido.
   * @param {Response} pRes - Response que utilizara para contestar al cliente.
   */
  static responseBadRequest(pEndpoint, pMethod, pRes) {
    const anwser = {
      status: 'Error',
      message: 'Request invalido',
    };
    try{
      Logguer.logResponseInfo(pRes.get('correlationalId'), pEndpoint, pMethod, anwser);
    } catch(err){
      console.log(err);
    } finally {
      pRes.status(400).json(anwser);
    }
  }

  static responseInvalidToken(pEndpoint, pMethod, pRes) {
    const awnser = {
      status: 'Error',
      message: 'Token Invalido',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), pEndpoint, pMethod, awnser);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(401).json(awnser);
    }
  }


  static responseInternalServerError(pEndpoint, pMethod, pRes) {
    const anwser = {
      status: 'Error',
      message: 'Error desconocido',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), pEndpoint, pMethod, anwser);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(500).json(anwser);
    }
  }


  static responseInvalidCredentials(pEndpoint, pMethod, pRes) {
    const awnser = {
      status: 'Error',
      message: 'Credenciales invalidas',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), pEndpoint, pMethod, awnser);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(401).json(awnser);
    }
  }
}
// Definicion de la clase BaseController.
module.exports = BaseController;
