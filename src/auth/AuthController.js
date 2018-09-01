//Imports
// Controlador base definido por la arquitectura de referencia.
let BaseController = require('../spi/BaseController.js');

class AuthController extends BaseController {

    //Implementacion del buildRoutes particular del controlador de de Usuarios.
    buildRouter() {
        // POST
        this.router.get('/', function (req, res) {
            res.status(200).send("oka desde auth");
        });
    }
}
// Singleton del controlador de Auth. Me aseguro que no haya mas instancias.
const authControllerSingleton = new AuthController();
module.exports = authControllerSingleton;