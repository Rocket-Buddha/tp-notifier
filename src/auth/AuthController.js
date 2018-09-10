// Helper de hashing.
const BCrypt = require('../helpers/Crypt.js');
// Helper de json web token.
const JWT = require('../helpers/JWT.js');
// Controlador base definido por la arquitectura de referencia.
const BaseController = require('../spi/BaseController');
// Definicion de la clase Usuario.
const User = require('../users/UsersModel');
// Modelo de usuarios.
const UserModel = require('../users/UsersModel');
// Helper de loggin.
const Logguer = require('../helpers/Logguer');

/**
 *  Clase controladora de la autenticacion.
 */
class AuthController extends BaseController {
  /**
   * Implementacion del buildRoutes particular del controlador de de Usuarios.
   */
  buildRouter() {
    this.router.post('/', async (req, res) => { AuthController.handlePost(req, res); });
  }

  /**
   * Metodo para hacer el handler del post.
   * @param {Request} req - Request enviado.
   * @param {Response} res - Response a enviar.
   */
  static async handlePost(req, res) {
    try {
      // Logging request.
      Logguer.logRequestInfo('/authenticate', 'POST', req);
      // Verifico que el request sea valido.
      if (AuthController.checkPostRequest(req)) {
        // Armo el usuario que vino en el request.
        const requestUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        });
        // Checkeo la existencia del usuario y el password.
        const persistedUser = await AuthController.checkUserExistence(requestUser);
        if (persistedUser
          && await AuthController.checkPassword(requestUser.password, persistedUser.password)) {
          // Genero el token.
          const token = await AuthController.generateToken(persistedUser);
          // Armo el array de usuarios.
          const usernamesArray = await AuthController.getAllUsersArray();
          // Respondo satisfactoriamente.
          AuthController.responsePostsuccessfully(res, token, usernamesArray);
        } else {
          AuthController.responseInvalidCredentials(res);
        }
      } else { // Si el request no esta bien formado respondo que el request es invalido.
        AuthController.responseBadRequest(res);
      }
    } catch (err) {
      // Logueo el error.
      Logguer.logEndpointError('/authenticate', 'POST', req.headers.cId, err);
      AuthController.responseInternalServerError(res);
    }
  }

  /**
   * Metodo que checkea que el request del login este bien formado.
   * @param {Object} pRequest  - Request de entrada.
   * @return {Boolean} Si el request es valido o no.
   */
  static checkPostRequest(pRequest) {
    return pRequest.body.username
      && pRequest.body.password;
  }

  /**
   *  Metodo que checkea si el usuario existe.
   * @param {Schema} pUser - Schema moongoose de usuario.
   * @return {Promise} Promesa de chequiar la existencia del usuario.
   */
  static async checkUserExistence(pUser) {
    const user = UserModel.findOne({ username: pUser.username });
    if (user) {
      return user;
    }
    return false;
  }


  /**
   * Metodo que verifica que los passwords matcheen.
   * @param {String} pPassClear - String de password en claro que viene en el request.
   * @param {String} pPassHashed - String de password hasheado que esta en base.
   * @return {Promise} Promesa de informar si el password coincide o no.
   */
  static async checkPassword(pPassClear, pPassHashed) {
    const result = await BCrypt.comparePasswords(pPassClear, pPassHashed);
    if (result) {
      return true;
    }
    return false;
  }

  /**
   * Metodo que genera el token para un usuario determinado.
   * @param {User} pUser - Objeto usuario para el cual quiero generar el token.
   * @return {Promise} Promesa de devolver el String del token generado.
   */
  static async generateToken(pUser) {
    // Genera el token, pasandole el payload.
    return JWT.sign({
      username: pUser.username,
      email: pUser.email,
    });
  }

  /**
   * Metodo para obtener un array con todos los nombres de usuarios de los usuarios.
   * @return {Promise} Promesa de pasar el array de usuarios.
   */
  static async getAllUsersArray() {
    // Traigo los usuarios de la base.
    const dbUsers = await UserModel.find({});
    // Declaro e instancio un array para guardar los usernames.
    const usernames = [];
    // Paso los usernames al array.
    dbUsers.forEach((element) => {
      usernames.push(element.username);
    });
    // Retorno los usernames.
    return usernames;
  }

  /**
   * Metodo para responder cuando un POST fue ejecutado satisfactoriamente.
   * @param {Response} pRes - Response necesario para poder contestar.
   */
  static responsePostsuccessfully(pRes, pToken, usernamesArray) {
    pRes.status(200).json({
      token: pToken,
      users: usernamesArray,
    });
  }
}

// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const authControllerSingleton = new AuthController();
module.exports = authControllerSingleton;
