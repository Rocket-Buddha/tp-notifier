// Clase helper para manejar cuestiones de tiempo y formateos cross a toda la API.
class Time {

    constructor(){
        this.moment = require('moment');
    }

    getTimeString(){
        return this.moment().toISOString();
    }
}

// Singleton del controlador de helper de time. Me aseguro que no haya mas instancias.
const timeSingleton = new Time();
module.exports = timeSingleton;