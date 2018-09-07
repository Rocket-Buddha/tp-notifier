const JsonWebToken = require('jsonwebtoken');
const EXCEPTIONS_PAYLOADS = require('./ExceptionPayloads');
const Properties = require('./Properties');

/**
 * Clase helper de JSON Web Tokens
 */
class JWT {
  /**
     * Metodo para generar un token a partir de un Payload y un secreto.
     * @param {Object} pPayload - Carga ultil del token. La misma que se devuelve al desencriptarla.
     * @param {Function} pCallback  - Callback al que se llama una vez terminada
     * la operacion asincrona.
     */
  static async sign(pPayload) {
    return JsonWebToken.sign(pPayload,
      // Secreto externalizado en properties.
      Properties.get('jwt.token.secret'),
      // Tiempo de expiracion, externalizado en properties en minutos.
      { expiresIn: 60 * Properties.get('jwt.token.expire') });
  }

  /**
     * Metodo para verificar un token.
     * @param {String} pToken - Token recibido en el Request.
     * @param {Fuction} pCallback - Callback ejecutado al finalizar la operacion asincrona.
     */
  static async verify(pToken) {
    try {
      return JsonWebToken.verify(pToken.toString(),
      // Secreto externalizado en properties.
        Properties.get('jwt.token.secret'));
    } catch (err) {
      throw EXCEPTIONS_PAYLOADS.JWT_VALIDATION_ERROR_PAYLOAD;
    }
  }
}

module.exports = JWT;
