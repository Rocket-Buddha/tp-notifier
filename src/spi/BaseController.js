
/**
 * Clase abstracta BaseController.
 */
class BaseController {

    /**
     * Constructor de la clase de controlador base.
     */
    constructor() {
        // Evita que se instancie la clase BaseController.
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        // Setup de los parser que aplicaran para todos los router de los controladores.
        let express = require('express');
        let bodyParser = require('body-parser');
        // Declaracion e instanciacion del atributo router.
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
        // Llamado al metodo destinado a ser implementado por el subtipo.
        // Este metodo es el que buildea las rutas especificas del controlador.
        this.buildRouter();
    }

    /**
     * Metodo abstracto a ser implementado por el subtipo con el buildeo de rutas especifico.
     */
    buildRouter() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }

    /**
     * Metodo para responder que el request enviado es invalido.
     * @param {Response} pRes - Response que utilizara para contestar al cliente.
     */
    responseBadRequest(pRes) {
        pRes.status(400).json({
            "status": "Error",
            "message": "Request invalido"
        });
    }

    /**
     * Metodo para responder que el token suministrado no es valido.
     * @param {Response} pRes - Response que utilizara para contestar al cliente.
     */
    responseInvalidToken(pRes) {
        pRes.status(401).json({
            "status": "Error",
            "message": "Token Invalido"
        });
    }

    /**
     * Metodo para contestar que hubo un eeror interno sel servidor.
     * @param {Response} pRes - Response que utilizara para contestar al cliente.
     */
    responseInternalServerError(pRes) {
        pRes.status(500).json({
            "status": "Error",
            "message": "Error desconocido"
        });
    }

    /**
     * Metodo para contestar que las credenciales suministradas no son validas.
     * @param {Response} pRes - Response que utilizara para contestar al cliente.
     */
    responseInvalidCredentials(pRes) {
        pRes.status(401).json({
            "status": "Error",
            "message": "Credenciales invalidas"
        });
    }
}

// Definicion de la clase BaseController.
module.exports = BaseController;
