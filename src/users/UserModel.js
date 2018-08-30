



var mongoose = require('mongoose');
//var router = express.Router();
var bodyParser = require('body-parser');


var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');