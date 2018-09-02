//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');
// Definicion de la clase Mensaje.
let Message = require('../messages/Message.js');

class MessagesController extends BaseController {
    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        //POST
        this.router.post('/', (req, res) => {
            // 1. Verificar que el request este bien conformado.
            if (this.checkPostRequest(req)) {
                // 2. Verificar que el token sea correcto.
                this.checkToken(this.getToken(req))
                    .then((decode) => {
                        let message = this.buildMessageFromRequest(req, decode);
                        // 3. Persistir el mensaje en base.
                        return this.saveMessage(message);
                    })
                    .then((result) => {
                        this.MessagePostedSuccessfully(res);
                    })
                    .catch(err => {
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
            else {
                this.responseBadRequest(res);
            }
        });
    }

    // Metodo destinado a chequiar que el request del post este bien conformado.
    // Que exista un mensaje, una lista de destinatarios con al menos un destinatario.
    checkPostRequest(pRequest) {
        return pRequest.body.mensaje
            && pRequest.body.destinatarios
            && pRequest.body.destinatarios[0];
    }

    getToken(pReq) {
        //return pReq.query.token;
        //return pReq.body.token;
        return pReq.headers['x-access-token'];
    }

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

    buildMessageFromRequest(pRequest, pDecodeToken) {
        return new Message(pDecodeToken.username,
            pRequest.body.destinatarios,
            pRequest.body.mensaje,
            (new Date()).toUTCString(),
            false,
        );
    }

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

    MessagePostedSuccessfully(pRes) {
        pRes.status(200).json({
            "Mensaje": "Mensaje posteado con exito"
        });
    }
}
// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const messagesControllerSingleton = new MessagesController();
module.exports = messagesControllerSingleton;