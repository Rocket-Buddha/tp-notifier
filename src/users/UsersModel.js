const usersModelSingleton = require('mongoose')
  .model('users',
    new require('mongoose').Schema({
      username: {
        type: String,
        index: true,
        unique: true
      },
      password: String,
      email: String
    }));

// Singleton, evitamos que existan mas instancias del modelo de usuarios.
module.exports = usersModelSingleton;