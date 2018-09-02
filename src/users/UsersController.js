
//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');

class UserController extends BaseController {

    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        // POST
        this.router.post('/', function (req, res) {
            // Verifico que el request tenga todo lo que necesito.
            if (req.body.username
                && req.body.password
                && req.body.email) {
                // Creo el usuario con el pass hesheado.
                let user = require('../helpers/Crypt').getHashedUserFromRequest(req);
                // Utilizo el DAO particular del controlador para que lo persista.
                // No puedo usarlo como atributo por que en este contexto no tiene sentido (En JS, Java lo resulve :( ).
                require('./UsersDAO').create(user, function (err, user) {
                    // Si hay un error.
                    if (err) {
                        // Error de mongo de clave duplicada.
                        if (err.code == 11000) {
                            // Devuelve 400 con la salida definida.
                            res.status(400).json({
                                "status": "Error",
                                "message": "Usuario duplicado"
                            });
                        }
                        else {
                            return res.status(500).json({
                                "status": "Error",
                                "message": "Eror desconocido al intentar agregar el uasuario a la base"
                            });
                        }
                    }
                    // Sino muesto la salida definida.
                    else {
                        res.status(200).json({
                            "status": "Ok",
                            "message": "Se ha registrado correctamente"
                        });
                    }
                })
            }
            else {
                res.status(400).json({
                    "status": "Error",
                    "message": "Request invalido"
                });
            }
        });
    }
}
// Singleton del controlador de Usuarios. Me aseguro que no haya mas instancias.
const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;