/**  
 * Clase helper para manejar cuestiones de tiempo y formateos cross a toda la API.
 */
class Time {

    /**
     * Constructor de la clase herlper de formato de fecha y hora.
     */
    constructor(){
        this.moment = require('moment');
    }

    /**
     * Metodo que devuelve la hora actual en formato ISO UTC.
     * @return {String} Fecha y hora actual formateada en formato ISO UTC.
     */
    getTimeString(){
        return this.moment().toISOString();
    }
}

// Singleton del controlador de helper de time. Me aseguro que no haya mas instancias.
const timeSingleton = new Time();
module.exports = timeSingleton;