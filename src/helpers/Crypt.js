const BCrypt = require('bcrypt');
const Properties = require('./Properties');
const UsersModel = require('../users/UsersModel.js');

/**
 * Clase de helper para hashing.
 */
class Crypt {
  /**
   * Metodo para convertir un request que viene con un usuario
   * en una instancia de usuario con el pass hasheado.
   * @param {Request} pRequest
   * @return {User} Usuario con el password hasheado.
   */
  static async getHashedUserFromRequest(pRequest) {
    const hashedPass = await BCrypt.hash(pRequest.body.password, Properties.get('db.crypt.rounds'));
    // El pass no puede quedar en claro.
    // Instancio el usuario pero con el pass hasheado.
    return (new UsersModel({
      username: pRequest.body.username,
      password: hashedPass,
      email: pRequest.body.email,
    }));
  }

  /**
   * Metodo para comparar un pass claro contra uno hasheado.
   * @param {String} pPlainPassword - Password claro.
   * @param {String} pHashedPassword - Password hasheado.
   * @param {Function} pCallback - Funcion de callback.
   * @return {Promise} Promesa que devolvera un Boolean por la comparacion de los dos pass.
   */
  static async comparePasswords(pPlainPassword, pHashedPassword) {
    return BCrypt.compare(pPlainPassword, pHashedPassword);
  }
}
module.exports = Crypt;
