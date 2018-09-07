// Controlador base definido por la arquitectura de referencia.
const BaseController = require('../spi/BaseController');
// Modelo de mensajes.
const MessagesModel = require('../messages/MessagesModel');
// Helper de formateo de tiempo.
const Time = require('../helpers/Time');
// Helper de Json web tokens.
const JWT = require('../helpers/JWT');

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
  }

  /**
   * Metodo para manejar el post.
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response para responder.
   */
  static async handlePost(req, res) {
    try {
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
          MessagesController.responseInvalidToken(res);
        }
      } else { // Request invalido.
        MessagesController.responseBadRequest(res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case 1:
          MessagesController.responseInvalidToken(res);
          break;
        default:// Error interno generico.
          MessagesController.responseInternalServerError(res);
      }
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
     * Obtiene el token desde el request.
     * @param {Request} pReq - Request de post de login.
     * @return {String} String del token que viene en el header del request.
     */
  static getTokenFromRequest(pReq) {
    // return pReq.query.token;
    // return pReq.body.token;
    return pReq.headers['x-access-token'];
  }

  /**
     * Metodo para validar que el Token sea valido.
     * @param {String} pToken - Stringo con el Token enviado en el request.
     * @return {Prommise} Promesa de devuelve el Token decencriptado,
     * o sea el payload cuando finaliza.
     */
  static async checkToken(pToken) {
    return JWT.verify(pToken);
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
    pRes.status(200).json({
      mensaje: 'Mensaje posteado con exito',
    });
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
        MessagesController.responseInvalidToken(res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case 1:
          MessagesController.responseInvalidToken(res);
          break;
        default:// Error interno generico.
          MessagesController.responseInternalServerError(res);
      }
    }
  }

  /**
     * Metodo invocado para contestar con los mensajes del usuario.
     * @param {Response} pRes - Response que el metodo utilizara para contestar.
     */
  static MessageGetSuccessfully(pRes, messages) {
    pRes.status(200).json(messages);
  }
}
// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const messagesControllerSingleton = new MessagesController();
module.exports = messagesControllerSingleton;
