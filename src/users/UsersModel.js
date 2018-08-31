
let BaseModel = require('../spi/BaseModel.js');

class UsersModel extends BaseModel {

  buildSchema(){
    this.schemaName = 'Users';
    this.mongoose.model(this.schemaName, new this.mongoose.Schema({
      name: String,
      email: String,
      password: String
    }));
  }
}

const usersModelSingleton = new UsersModel();
module.exports = usersModelSingleton;