// Clase abstracta BaseController.
class BaseController {
    
    //Constructor de la clase.
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
    
    // Metodo abstracto a ser implementado por el subtipo con el buildeo de rutas especifico.
    buildRouter() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }
}
// Definicion de la clase BaseController.
module.exports = BaseController;
