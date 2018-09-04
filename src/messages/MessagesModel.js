const messagesModelSingleton = require('mongoose')
  .model('messages',
    new require('mongoose').Schema({
      sender: String,
      recipients: [],
      message: String,
      timestamp: String,
      readed: Boolean
    }));

// Singleton, evitamos que existan mas instancias de del modelo de mensajes.
module.exports = messagesModelSingleton;