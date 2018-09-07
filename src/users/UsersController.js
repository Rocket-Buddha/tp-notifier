// Controlador base definido por la arquitectura de referencia.
const BaseController = require('../spi/BaseController');
const BCrypt = require('../helpers/Crypt');

/**
 * Clase de controllador de usuarios.
 */
class UserController extends BaseController {
  /**
   * Implementacion del buildRoutes particular del controlador de de Usuarios.
   */
  buildRouter() {
    // POST
    this.router.post('/', async (req, res) => { await UserController.handlePost(req, res); });
  }

  /**
   * Metodo para manejar el posteo en el endpoint.
   * @param {Request} req - Request que llega en el post.
   * @param {Response} res - Response para responder.
   */
  static async handlePost(req, res) {
    try {
      // Verifico que el request tenga todo lo que necesito.
      if (UserController.checkPostRequest(req)) {
        // Creo el usuario con el pass hesheado.
        const user = await BCrypt.getHashedUserFromRequest(req);
        // Utilizo el modelo particular del controlador para que lo persista.
        await user.save();
        // Respondo que el post fue satisfactorio.
        UserController.responsePostsuccessfully(res);
      } else { // Si el request esta mal formado,
        UserController.responseBadRequest(res);
      }
    } catch (err) {
      switch (err.code) {
        // Codigo de error de mongo de clave duplicada.
        case 11000:
          UserController.responseDuplicateUser(res);
          break;
        default:
          UserController.responseInternalServerError(res);
      }
    }
  }

  /**
   * Metodo que checkea que este bien formado el request.
   * @param {Request} pReq - Request a validar.
   */
  static checkPostRequest(pReq) {
    return pReq.body.username
      && pReq.body.password
      && pReq.body.email;
  }

  /**
   * Metodo para responder que el usuario que se intenta dar de alta ya existe.
   * @param {Response} pRes - Response necesario para poder contestar.
   */
  static responseDuplicateUser(pRes) {
    pRes.status(400).json({
      status: 'Error',
      message: 'Usuario duplicado',
    });
  }

  /**
   * Metodo para responder cuando un POST fue ejecutado satisfactoriamente.
   * @param {Response} pRes - Response necesario para poder contestar.
   */
  static responsePostsuccessfully(pRes) {
    pRes.status(200).json({
      status: 'Ok',
      message: 'Se ha registrado correctamente',
    });
  }
}
// Singleton del controlador de Usuarios. Me aseguro que no haya mas instancias.
const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;
