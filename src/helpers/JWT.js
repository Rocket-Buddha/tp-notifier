
/** 
 * Clase helper de JSON Web Tokens 
 */
class JWT {

    /**
     * Constructor del helper de JWT.
     */
    constructor() {
        this.jwt = require('jsonwebtoken');
        this.properties = require('./Properties');
    }

    /**
     * Metodo para generar un token a partir de un Payload y un secreto.
     * @param {Object} pPayload - Carga ultil del token. La misma que se devuelve al desencriptarla.
     * @param {Function} pCallback  - Callback al que se llama una vez terminada la operacion asincrona.
     */
    sign(pPayload, pCallback) {
        this.jwt.sign(pPayload,
            // Secreto externalizado en properties.
            this.properties.get('jwt.token.secret'),
            // Tiempo de expiracion, externalizado en properties en minutos.
            { expiresIn: 60 * this.properties.get('jwt.token.expire') },
            pCallback);
    }

    /**
     * Metodo para verificar un token.
     * @param {String} pToken - Token recibido en el Request.
     * @param {Fuction} pCallback - Callback ejecutado al finalizar la operacion asincrona. 
     */
    verify(pToken, pCallback) {
        this.jwt.verify(pToken,
             // Secreto externalizado en properties.
            this.properties.get('jwt.token.secret'),
            pCallback);
    }
}

// Singleton del helper de json web tokens, me aseguro que solo haya una instancia.
const JWTSingleton = new JWT();
module.exports = JWTSingleton;