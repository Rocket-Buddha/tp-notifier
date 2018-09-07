const Mongoose = require('mongoose');
/**
 * Configuracion particular del modelo y el esquema de usuarios.
 */
const usersModelSingleton = require('mongoose')
  .model('users',
    new Mongoose.Schema({
      username: {
        type: String,
        index: true,
        unique: true,
      },
      password: String,
      email: String,
    }));
// Singleton, evitamos que existan mas instancias del modelo de usuarios.
module.exports = usersModelSingleton;
