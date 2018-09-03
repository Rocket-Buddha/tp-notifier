//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');
// Definicion de la clase Mensaje.
let Message = require('../messages/Message.js');

/**
 * Clase controladora para el endpoint de mensajes.
 */
class MessagesController extends BaseController {

    /**
     * Implementacion del buildRoutes particular del controlador de de Usuarios.
     */
    buildRouter() {
        //POST
        this.router.post('/', (req, res) => {
            // Verificar que el request este bien conformado.
            if (this.checkPostRequest(req)) {
                // Verificar que el token sea correcto.
                this.checkToken(this.getTokenFromRequest(req))
                    .then((decode) => {
                        let message = this.buildMessageFromRequest(req, decode);
                        // Persistir el mensaje en base.
                        return this.saveMessage(message);
                    })
                    .then((result) => {
                        this.MessagePostedSuccessfully(res);
                    })
                    .catch(err => {
                        console.log(err);
                        switch (err) {
                            case 0:
                                this.responseInternalServerError(res);
                                break;
                            case 1:
                                this.responseInvalidToken(res);
                                break;
                            default:
                                this.responseInternalServerError(res);
                        }
                    });
            }
            // Request invalido.
            else {
                this.responseBadRequest(res);
            }
        });

        //GET
        this.router.get("/", (req, res) => {
            // Chequeo el token.
            this.checkToken(this.getTokenFromRequest(req))
                .then((decode) => {
                  return this.getAllUserRecivedMessages(decode.username);
                })
                .then((messages)=>{
                    console.log(messages);
                    res.status(200).json(messages);
                })
                .catch(err => {
                    console.log(err);
                    switch (err) {
                        case 0:
                            this.responseInternalServerError(res);
                            break;
                        case 1:
                            this.responseInvalidToken(res);
                            break;
                        default:
                            this.responseInternalServerError(res);
                    }
                });
        });
    }

    /**
     * Metodo destinado a chequiar que el request del post este bien conformado.
     * Que exista un mensaje, una lista de destinatarios con al menos un destinatario.
     * @param {Request} pRequest - Checkea si el request del POST de login es correcto.
     * @return {Boolean} Retorna si todo los parametros necesarios en el request existen.
     */
    checkPostRequest(pRequest) {
        return pRequest.body.mensaje
            && pRequest.body.destinatarios
            && pRequest.body.destinatarios[0];
    }

    /**
     * Obtiene el token desde el request.
     * @param {Request} pReq - Request de post de login.
     * @return {String} String del token que viene en el header del request.
     */
    getTokenFromRequest(pReq) {
        //return pReq.query.token;
        //return pReq.body.token;
        return pReq.headers['x-access-token'];
    }

    /**
     * Metodo para validar que el Token sea valido.
     * @param {String} pToken - Stringo con el Token enviado en el request.
     * @return {Prommise} Promesa de devuelve el Token decencriptado, o sea el payload cuando finaliza. 
     */
    checkToken(pToken) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../helpers/JWT.js').verify(pToken, (err, decoded) => {
                if (err) {
                    promiseFail(1);
                }
                else {
                    promiseSucesfull(decoded);
                }
            });
        });
    }

    /**
     * Metodo para buildear el mensaje desde un request.
     * @param {Request} pRequest - Request con mensaje.
     * @param {Object} pDecodeToken - Token decodificado.
     * @return {Message} Objeto mensaje instanciado. 
     */
    buildMessageFromRequest(pRequest, pDecodeToken) {
        return new Message(pDecodeToken.username,
            pRequest.body.destinatarios,
            pRequest.body.mensaje,
            require('../helpers/Time.js').getTimeString(),
            false,
        );
    }

    /**
     * Metodo invocado para persistir un mensaje en base.
     * @param {Message} pMessage - Objeto menaje que se quiere persistir.
     * @return {Promise} Promesa que devuelve el resultado de la operacion de escritura en base.
     */
    saveMessage(pMessage) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('./MessagesDAO.js').create(pMessage, (err, res) => {
                if (err) {
                    promiseFail(0);
                }
                else {
                    promiseSucesfull(res);
                }
            });
        });
    }

    /**
     * Metodo invocado para contestar que el mensaje fue posteado con exito.
     * @param {Response} pRes - Response que el metodo utilizara para contestar.
     */
    MessagePostedSuccessfully(pRes) {
        pRes.status(200).json({
            "Mensaje": "Mensaje posteado con exito"
        });
    }

    /**
     * Metodo que devuelve todos los mensajes que recibio el usuario.
     * @param {String} pUsername
     */
    getAllUserRecivedMessages(pUsername) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('./MessagesDAO.js').find({ 'recipients': { $elemMatch: { username: pUsername } } }
                , (err, res) => {
                    if (err) {
                        promiseFail(0);
                    }
                    else {
                        // Objeto que se va a enviar en la respuesta.
                        let messagesRespond = {
                            "status": "Ok",
                            "totalMensajes": res.length,
                            "mensajesRecibidos": []
                        }
                        // Por cada mensaje
                        res.forEach(function (element) {
                            messagesRespond.mensajesRecibidos.push({
                                "remitente": element.sender,
                                "mensaje": element.message,
                                "enviado": element.timestamp,
                                "leido": element.readed
                            });
                        });
                        promiseSucesfull(messagesRespond);
                    }
                });
        });
    }
}

// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const messagesControllerSingleton = new MessagesController();
module.exports = messagesControllerSingleton;