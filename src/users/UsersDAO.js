// Imports.
// Import de BaseDAO, clase definida por nuestro arquetipo,
// para que hereden de ella todos los DAOs.
let BaseDAO = require('../spi/BaseDAO.js');

class UsersDAO extends BaseDAO {

  // Implementacion de UserDAO de buildSchema.
  // Define como sera el esquema de persistencia para la entidad Usuario.
  buildSchema() {
    //Declaro e instancio el atributo schema.
    this.schema = this.mongoose.model('Users', new this.mongoose.Schema({
      username: {
        type: String,
        index: true,
        unique: true
      },
      password: String,
      email: String
    }));
  }
}

// Singleton, evitamos que existan mas instancias de User DAO.
const usersDAOSingleton = new UsersDAO();
module.exports = usersDAOSingleton;