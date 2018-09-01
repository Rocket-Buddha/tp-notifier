//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');

class AuthController extends BaseController {
    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        // POST
        this.router.post('/', function (req, res) {
            // Verifico que el request sea correcto.
            if (req.body.username
                && req.body.password) {
                // Verifico que el usuario exista.
                require('../users/UsersDAO.js').findOne({ 'username': req.body.username }, function (err, resad) {
                    // Verifico si hubo un error.
                    if (err) {
                        res.status(500).json({
                            "status": "Error",
                            "message": "Error interno, pudrete flanders"
                        });
                    }
                    else {
                        // Existe ? 
                        if (resad.password) {
                            // Verifico que la password sea correcta.
                            if (require('../helpers/Crypt.js').comparePasswords(req.body.password, resad.password)) {
                                // Genero el token.
                                require('../helpers/JWT.js').sign({ foo: 'bar' }, function (err, token) {
                                    if (err) {

                                    }
                                    else {
                                        require('../users/UsersDAO.js').getAll(function (err, users) {
                                            if (err) {

                                            } else {

                                                let usernames = [];
                                                users.forEach(function (element) {
                                                    usernames.push(element.username);
                                                });

                                                // Respondo.
                                                res.status(200).json({
                                                    "token": token,
                                                    "users": usernames
                                                });
                                            }
                                        });

                                    }
                                })
                            }
                            // Contrasenia incorrecta.
                            else {
                                res.status(401).json({
                                    "status": "Error",
                                    "message": "Credenciales invalidas"
                                });
                            }
                        }
                        // No existe el usuario.
                        else {
                            res.status(401).json({
                                "status": "Error",
                                "message": "Credenciales invalidas"
                            });
                        }
                    }

                });
            }
            //Request invalido.
            else {
                res.status(400).json({
                    "status": "Error",
                    "message": "Request invalido"
                });
            }
        });
    }
}
// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const authControllerSingleton = new AuthController();
module.exports = authControllerSingleton;