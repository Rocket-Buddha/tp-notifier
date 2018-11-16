// Controlador base definido por la arquitectura de referencia.
const BaseController = require('../spi/BaseController');
const Logguer = require('../helpers/Logguer');
// Definiciones de errores.
const EXCEPTIONS = require('../helpers/CustomExceptions');
// Modelo de usuarios.
const UsersModel = require('../users/UsersModel');

/**
 * Clase de controllador de status.
 */
class StatusController extends BaseController {
  /**
   * Implementacion del buildRoutes particular del controlador de de Usuarios.
   */
  buildRouter() {
    // POST
    this.router.put('/', async (req, res) => { await StatusController.handlePut(req, res); });
  }

  /**
   * asdasdas
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response para responder.
   */
  static async handlePut(req, res) {
    try {
      // Logging request.
      Logguer.logRequestInfo(res.get('correlationalId'), '/status', 'PUT', req);
      // Verificar que el request este bien conformado.
      if (StatusController.checkPutRequest(req)) {
        const token = StatusController.getTokenFromRequest(req);
        // Verificar que el token sea correcto.
        const decode = await StatusController.checkToken(token);
        // Nunca deberia llegar a esta validacion si el token no es valido.
        // Antes catcheara el error. Verifico por las dudas.
        if (decode.username) {
          const status = StatusController.getStatusFromRequest(req);
          await UsersModel.update({ username: decode.username }, { $set: { status } });
          StatusController.StatusChangedSuccessfully(res);
        } else { // Token invalido.
          StatusController.responseInvalidToken('/status', 'PUT', res);
        }
      } else { // Request invalido.
        StatusController.responseBadRequest('/status', 'PUT', res);
      }
    } catch (err) {
      console.log(err);
      switch (err.code) {
        // Codigo de error de JWT No valido.
        case EXCEPTIONS.JWT_VALIDATION_ERROR.code:
          StatusController.responseInvalidToken('/status', 'PUT', res);
          break;
        default:// Error interno generico.
          // Logueo el error.
          Logguer.logEndpointError(res.get('correlationalId'), '/status', 'PUT', err);
          StatusController.responseInternalServerError('/status', 'PUT', res);
      }
    }
  }

  /**
   * asdas
   * @param {Request} pRequest - Checkea si el request del POST de login es correcto.
   * @return {Boolean} Retorna si todo los parametros necesarios en el request existen.
   */
  static checkPutRequest(pRequest) {
    return pRequest.body 
    && (pRequest.body.estado === true
      || pRequest.body.estado === false);
  }

  static getStatusFromRequest(pRequest) {
    return pRequest.body.estado;
  }

  /**
   * gfhfg
   * @param {Response} pRes - Response que el metodo utilizara para contestar.
   */
  static StatusChangedSuccessfully(pRes) {
    const answer = {
      mensaje: 'Estado cambiado con exito',
    };
    try {
      Logguer.logResponseInfo(pRes.get('correlationalId'), '/status', 'PUT', answer);
    } catch (err) {
      console.log(err);
    } finally {
      pRes.status(200).json(answer);
    }
  }
}
// Singleton del controlador de Usuarios. Me aseguro que no haya mas instancias.
const statusControllerSingleton = new StatusController();
module.exports = statusControllerSingleton;
