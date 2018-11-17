// Controlador base definido por la arquitectura de referencia.
const BaseController = require('../spi/BaseController');
// Modelo de mensajes.
const MessagesModel = require('../messages/MessagesModel');
// Helper de formateo de tiempo.
const Time = require('../helpers/Time');
// Helper de loggin.
const Logguer = require('../helpers/Logguer');
// Definiciones de errores.
const EXCEPTIONS = require('../helpers/CustomExceptions');

/**
 * Clase controladora para el endpoint de mensajes.
 */
class MessagesController extends BaseController {
  /**
   * Implementacion del buildRoutes particular del controlador de de Usuarios.
   */
  buildRouter() {
    // POST
    this.router.post('/', async (req, res) => { await MessagesController.handlePost(req, res); });
    // GET
    this.router.get('/', async (req, res) => { await MessagesController.handleGet(req, res); });
    // PUT
    this.router.put('/:id', async (req, res) => { await MessagesController.handlePut(req, res); });
  }

  /**
   * Metodo para manejar el post.
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response para responder.
   */
  static async handlePost(req, res) {
    try {
      // Logging request.
      Logguer.logRequestInfo(res.get('correlationalId'), '/messages', 'POST', req);
      // Verificar que el request este bien conformado.
      if (MessagesController.checkPostRequest(req)) {
        const token = MessagesController.getTokenFromRequest(req);
        // Verificar que el token sea correcto.
        const decode = await MessagesController.checkToken(token);
        // Nunca deberia llegar a esta validacion si el token no es valido.
        // Antes catcheara el error. Verifico por las dudas.
        if (decode.username) {
          const message = MessagesController.buildMessageFromRequest(req, decode);
          await MessagesController.saveMessage(message);
          MessagesController.MessagePostedSuccessfully(res);
        } else { // Token invalido.
          MessagesController.responseInvalidToken('/messages', 'POST', res);
        }
      } else { // Request invalido.
        MessagesController.responseBadRequest('/messages', 'POST', res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case EXCEPTIONS.JWT_VALIDATION_ERROR.code:
          MessagesController.responseInvalidToken('/messages', 'POST', res);
          break;
        default:// Error interno generico.
          // Logueo el error.
          Logguer.logEndpointError(res.get('correlationalId'), '/messages', 'POST', err);
          MessagesController.responseInternalServerError('/messages', 'POST', res);
      }
    }
  }

  /**
   * Madsa
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response para responder.
   */
  static async handlePut(req, res) {
    try {
      // Logging request.
      Logguer.logRequestInfo(res.get('correlationalId'), '/messages', 'PUT', req);
      // Verificar que el request este bien conformado.
      if (MessagesController.checkPutRequest(req)) {
        const token = MessagesController.getTokenFromRequest(req);
        // Verificar que el token sea correcto.
        const decode = await MessagesController.checkToken(token);
        // Nunca deberia llegar a esta validacion si el token no es valido.
        // Antes catcheara el error. Verifico por las dudas.
        if (decode.username) {
          const readedVar = MessagesController.getReadedFromRequest(req);
          await MessagesModel.update({ _id: req.params.id }, { $set: { readed: readedVar } });
          MessagesController.ReadedChangedSuccessfully(res);
        } else { // Token invalido.
          MessagesController.responseInvalidToken('/messages', 'PUT', res);
        }
      } else { // Request invalido.
        MessagesController.responseBadRequest('/messages', 'PUT', res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case EXCEPTIONS.JWT_VALIDATION_ERROR.code:
          MessagesController.responseInvalidToken('/messages', 'PUT', res);
          break;
        default:// Error interno generico.
          // Logueo el error.
          Logguer.logEndpointError(res.get('correlationalId'), '/messages', 'PUT', err);
          MessagesController.responseInternalServerError('/messages', 'PUT', res);
      }
    }
  }

  /**
   * asdas
   * @param {Request} pRequest - Checkea si el request del POST de login es correcto.
   * @return {Boolean} Retorna si todo los parametros necesarios en el request existen.
   */
  static checkPutRequest(pRequest) {
    return (pRequest.body.leido === true
      || pRequest.body.leido === false)
      && pRequest.params.id;
  }

  static getReadedFromRequest(pRequest) {
    return pRequest.body.leido;
  }

  /**
   * gfhfg
   * @param {Response} pRes - Response que el metodo utilizara para contestar.
   */
  static ReadedChangedSuccessfully(pRes) {
    const answer = {
      mensaje: 'Se ha modificado correctamente',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), '/messages', 'PUT', answer);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(200).json(answer);
    }
  }

  /**
   * Metodo destinado a chequiar que el request del post este bien conformado.
   * Que exista un mensaje, una lista de destinatarios con al menos un destinatario.
   * @param {Request} pRequest - Checkea si el request del POST de login es correcto.
   * @return {Boolean} Retorna si todo los parametros necesarios en el request existen.
   */
  static checkPostRequest(pRequest) {
    return pRequest.body.mensaje
      && pRequest.body.destinatarios
      && pRequest.body.destinatarios[0];
  }

  /**
   * Metodo para buildear el mensaje desde un request.
   * @param {Request} pRequest - Request con mensaje.
   * @param {Object} pDecodeToken - Token decodificado.
   * @return {Schema} Objeto de esquema de mensaje instanciado.
   */
  static buildMessageFromRequest(pRequest, pDecodeToken) {
    return new MessagesModel({
      sender: pDecodeToken.username,
      recipients: pRequest.body.destinatarios,
      message: pRequest.body.mensaje,
      timestamp: Time.getTimeString(),
      readed: false,
    });
  }

  /**
   * Metodo invocado para persistir un mensaje en base.
   * @param {Schema} pMessage - Objeto  de esquema de menaje que se quiere persistir.
   * @return {Promise} Promesa que devuelve el resultado de la operacion de escritura en base.
   */
  static async saveMessage(pMessage) {
    return pMessage.save();
  }

  /**
   * Metodo invocado para contestar que el mensaje fue posteado con exito.
   * @param {Response} pRes - Response que el metodo utilizara para contestar.
   */
  static MessagePostedSuccessfully(pRes) {
    const answer = {
      mensaje: 'Mensaje posteado con exito',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), '/authenticate', 'POST', answer);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(200).json(answer);
    }
  }

  /**
   * Metodo que devuelve todos los mensajes que recibio el usuario.
   * @param {String} pUsername
   */
  static async getAllUserRecivedMessages(pUsername) {
    const messages = await MessagesModel.find({
      recipients:
      {
        $elemMatch: { username: pUsername },
      },
    });
    // Objeto que se va a enviar en la respuesta.
    const messagesRespond = {
      status: 'Ok',
      totalMensajes: messages.length,
      mensajesRecibidos: [],
    };
    // Por cada mensaje
    messages.forEach((element) => {
      messagesRespond.mensajesRecibidos.push({
        id: element.id,
        remitente: element.sender,
        mensaje: element.message,
        enviado: element.timestamp,
        leido: element.readed,
      });
    });
    return messagesRespond;
  }

  /**
   * Metodo para manejar el get.
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response para contestar.
   */
  static async handleGet(req, res) {
    try {
      // Logging request.
      Logguer.logRequestInfo(res.get('correlationalId'), '/messages', 'GET', req);
      // Obtengo el token del header.
      const token = MessagesController.getTokenFromRequest(req);
      // Verificar que el token sea correcto.
      const decode = await MessagesController.checkToken(token);
      // No hace falta validar esto ya que catchearia el error antes.
      // Por las dudas verifico.
      if (decode.username) {
        const messages = await MessagesController.getAllUserRecivedMessages(decode.username);
        MessagesController.MessageGetSuccessfully(res, messages);
      } else { // Token invalido.
        MessagesController.responseInvalidToken('/messages', 'GET', res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case EXCEPTIONS.JWT_VALIDATION_ERROR.code:
          MessagesController.responseInvalidToken('/messages', 'GET', res);
          break;
        default:// Error interno generico.
          // Logueo el error.
          Logguer.logEndpointError(res.get('correlationalId'), '/messages', 'GET', err);
          MessagesController.responseInternalServerError(res);
      }
    }
  }

  /**
   * Metodo invocado para contestar con los mensajes del usuario.
   * @param {Response} pRes - Response que el metodo utilizara para contestar.
   */
  static MessageGetSuccessfully(pRes, messages) {
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), '/messages', 'GET', messages);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(200).json(messages);
    }
  }
}
// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const messagesControllerSingleton = new MessagesController();
module.exports = messagesControllerSingleton;
