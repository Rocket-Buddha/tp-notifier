const Mongoose = require('mongoose');
/**
 * Configuracion particular del modelo y el esquema de mensajes.
 */
const messagesModelSingleton = require('mongoose')
  .model('messages',
    new Mongoose.Schema({
      sender: String,
      recipients: [],
      message: String,
      timestamp: String,
      readed: Boolean,
    }));
// Singleton, evitamos que existan mas instancias de del modelo de mensajes.
module.exports = messagesModelSingleton;
