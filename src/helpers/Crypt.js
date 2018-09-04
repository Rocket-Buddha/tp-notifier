// Imports.
// Entidad Usuario plana.
let UsersModel = require('../users/UsersModel.js');

/** 
 * Clase de helper para hashing. 
 */
class Crypt {

    /**
     * Constructor de el helper de heshing.
     */
    constructor() {
        this.properties = require('./Properties');
        this.bcrypt = require('bcrypt');
    }

    /**
     * Metodo para convertir un request que viene con un usuario
     * en una instancia de usuario con el pass hasheado. Esto en produccion habria que migrarlo a asincronico!!!!
     * @param {Request} pRequest
     * @return {User} Usuario con el password hasheado.
     */
    getHashedUserFromRequest(pRequest) {
        // El pass no puede quedar en claro.
        // Instancio el usuario pero con el pass hasheado.
        return (new UsersModel({
            username: pRequest.body.username,
            password: this.bcrypt.hashSync(pRequest.body.password, this.properties.get('db.crypt.rounds')),
            email: pRequest.body.email
        }));
    }

    /**
     * Metodo para comparar un pass claro contra uno hasheado.
     * @param {String} pPlainPassword - Password claro.
     * @param {String} pHashedPassword - Password hasheado.
     * @param {Function} pCallback - Funcion de callback.
     * @return {Promise} Promesa que devolvera un Boolean por la comparacion de los dos pass.
     */
    comparePasswords(pPlainPassword, pHashedPassword, pCallback) {
        return this.bcrypt.compare(pPlainPassword, pHashedPassword, pCallback);
    }
}

// Singleton del helper de hasheo, me aseguro que solo haya una instancia.
const cryptSingleton = new Crypt();
module.exports = cryptSingleton;