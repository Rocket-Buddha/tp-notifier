//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');
// Definicion de la clase Usuario.
let User = require('../users/UsersModel.js');

/**
 *  Clase controladora de la autenticacion. 
 */
class AuthController extends BaseController {
    
    /**
     * Implementacion del buildRoutes particular del controlador de de Usuarios.
     */
    buildRouter() {
        this.router.post('/', (req, res) => {
            // Objeto scope destinado a guardar variables de contexto necesarias entre promesas.
            let scope = {};
            // Verifico que el request sea valido.
            if (this.checkPostRequest(req)) {
                let requestUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email});
                // Comienza la cadena de promesas.
                this.checkUserExistence(requestUser)
                    .then((persistedUser) => {
                        if (persistedUser != null) {
                            scope.user = persistedUser;
                            return this.checkPassword(requestUser.password, persistedUser.password);
                        }
                    })
                    .then((result) => {
                        return this.generateToken(scope.user);
                    })
                    .then((token) => {
                        scope.token = token;
                        return this.getAllUsersArray()
                    })
                    .then((usernamesArray) => {
                        res.status(200).json({
                            "token": scope.token,
                            "users": usernamesArray
                        });
                    })
                    // Catcheo de errores de los fails de las promesas.
                    .catch(err => {
                        switch (err) {
                            case 0:
                                this.responseInternalServerError(res);
                                break;
                            case 1:
                                this.responseInvalidCredentials(res);
                                break;
                            default:
                                this.responseInternalServerError(res);
                        }

                    });
            }
            // Si el request no esta bien formado respondo que el request es invalido.
            else {
                this.responseBadRequest(res)
            }
        });
    }
    
    /**
     * Metodo que checkea que el request del login este bien formado.
     * @param {Object} pRequest  - Request de entrada.
     * @return {Boolean} Si el request es valido o no.
     */
    checkPostRequest(pRequest) {
        return pRequest.body.username
            && pRequest.body.password
    }

    /**
     *  Metodo que checkea si el usuario existe.
     * @param {Schema} pUser - Schema moongoose de usuario.
     * @return {Promise} Promesa de chequiar la existencia del usuario.
     */
    checkUserExistence(pUser) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../users/UsersModel.js').findOne({ 'username': pUser.username }, (err, persistedUser) => {
                if (err) {
                    // Hubo un error al tratar de recuperar de la bd el usuario.
                    throw 0;
                }
                else if (persistedUser) {
                    // El usuario fue recuperado con exito.
                    promiseSucesfull(persistedUser);
                }
                else {
                    // No existe el usuario. Credenciales invalidas.
                    promiseFail(1);
                }
            });
        });
    }

    /**
     * Metodo que verifica que los passwords matcheen.
     * @param {String} pPassClear - String de password en claro que viene en el request.
     * @param {String} pPassHashed - String de password hasheado que esta en base.
     * @return {Promise} Promesa de informar si el password coincide o no.
     */
    checkPassword(pPassClear, pPassHashed) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../helpers/Crypt.js').comparePasswords(pPassClear, pPassHashed, (err, result) => {
                if (err) {
                    // Hubo un error al tratar de comparar los hashes.
                    promiseFail(0);
                }
                else if (result) {
                    promiseSucesfull(true);
                }
                else {
                    //Password no matchea. Credenciales invalidas.
                    promiseFail(1);
                }
            });
        });
    }
    
    /**
     * Metodo que genera el token para un usuario determinado.
     * @param {User} pUser - Objeto usuario para el cual quiero generar el token.
     * @return {Promise} Promesa de devolver el String del token generado.
     */
    generateToken(pUser) {
        return new Promise((promiseSucesfull, promiseFail) => {
            // Genera el token, pasandole el payload.
            require('../helpers/JWT.js').sign({
                'username': pUser.username,
                'email': pUser.email
            }, (err, token) => {
                if (err) {
                    // Error interno al generar el token.
                    promiseFail(0);
                }
                else {
                    promiseSucesfull(token);
                }
            });
        });
    }

    /**
     * Metodo para obtener un array con todos los nombres de usuarios de los usuarios.
     * @return {Promise} Promesa de pasar el array de usuarios.
     */
    getAllUsersArray() {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../users/UsersModel.js').find({},(err, users) => {
                if (err) {
                    promiseFail(0);
                }
                else {
                    let usernames = [];
                    users.forEach(function (element) {
                        usernames.push(element.username);
                    });
                    promiseSucesfull(usernames);
                }
            });
        });
    }
}

// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const authControllerSingleton = new AuthController();
module.exports = authControllerSingleton;