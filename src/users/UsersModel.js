
let BaseModel = require('../spi/BaseModel.js');

class UsersModel extends BaseModel {
  buildSchema(){
    this.schema = this.mongoose.model('Users', new this.mongoose.Schema({
      username: String,
      password: String,
      email: String
    }));
  }
}

const usersModelSingleton = new UsersModel();
module.exports = usersModelSingleton;