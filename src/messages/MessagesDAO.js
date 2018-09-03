// Imports.
// Import de BaseDAO, clase definida por nuestro arquetipo,
// para que hereden de ella todos los DAOs.
let BaseDAO = require('../spi/BaseDAO.js');

/**
 * Clase de acceso a datos de mensajes.
 */
class MessagesDAO extends BaseDAO {

  /**
   *  Implementacion de MessagesDAO de buildSchema.
   *  Define como sera el esquema de persistencia para la entidad de Mensajes.
   */
  buildSchema() {
    //Declaro e instancio el atributo schema.
    this.schema = this.mongoose.model('Messages', new this.mongoose.Schema({
      sender: String,
      recipients: [],
      message: String,
      timestamp: String,
      readed: Boolean
    }));
  }
}

// Singleton, evitamos que existan mas instancias de Messages DAO.
const messagesDAOSingleton = new MessagesDAO();
module.exports = messagesDAOSingleton;