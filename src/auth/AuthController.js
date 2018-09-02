//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');
// Definicion de la clase Usuario.
let User = require('../users/User.js');

class AuthController extends BaseController {
    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        this.router.post('/', (req, res) => {
            // Objeto scope destinado a guardar variables de contexto necesarias entre promesas.
            let scope = {};
            // Verifico que el request sea valido.
            if (this.checkPostRequest(req)) {
                let requestUser = new User(req.body.username,
                    req.body.password,
                    req.body.email);
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
            else {
                this.responseBadRequest(res)
            }
        });
    }

    checkPostRequest(pRequest) {
        return pRequest.body.username
            && pRequest.body.password
    }

    checkUserExistence(pUser) {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../users/UsersDAO.js').findOne({ 'username': pUser.username }, (err, persistedUser) => {
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

    generateToken(pUser) {
        return new Promise((promiseSucesfull, promiseFail) => {
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

    getAllUsersArray() {
        return new Promise((promiseSucesfull, promiseFail) => {
            require('../users/UsersDAO.js').getAll((err, users) => {
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