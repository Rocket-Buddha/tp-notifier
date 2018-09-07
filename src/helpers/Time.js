const Moment = require('moment');

/**
 * Clase helper para manejar cuestiones de tiempo y formateos cross a toda la API.
 */
class Time {
  /**
     * Metodo que devuelve la hora actual en formato ISO UTC.
     * @return {String} Fecha y hora actual formateada en formato ISO UTC.
     */
  static getTimeString() {
    return Moment().toISOString();
  }
}
module.exports = Time;
