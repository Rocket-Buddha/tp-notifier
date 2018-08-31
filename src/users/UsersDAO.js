
let BaseDAO = require('../spi/BaseDAO.js');

class UsersDAO extends BaseDAO {
  buildSchema(){
    this.schema = this.mongoose.model('Users', new this.mongoose.Schema({
      username: String,
      password: String,
      email: String
    }));
  }
}

const usersDAOSingleton = new UsersDAO();
module.exports = usersDAOSingleton;