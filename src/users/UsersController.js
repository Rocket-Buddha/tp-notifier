
//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');
// Entidad Usuario plana.
let User = require('./User.js')

class UserController extends BaseController {

    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        // POST
        this.router.post('/', function (req, res) {
            // Declaro e instancio el usuario.
            let user = (new User(req.body.username,
                req.body.password,
                req.body.email));
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
                        return res.status(500).send("There was a problem adding the information to the database.");
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
        });
    }
}
// Singleton del controlador de Usuarios. Me aseguro que no haya mas instancias.
const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;