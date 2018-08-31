
let BaseController = require('../spi/BaseController.js');

class UserController extends BaseController {

    buildRouter() {

        // GET
        this.router.get('/', function (req, res) {
            res.send("GET llego");
        });

        // POST
        this.router.post('/', function (req, res) {
            require('./UsersModel').create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            },
                function (err, user) {
                    console.log("llego al callback");
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    res.status(200).send(user);
                });
        });

       /** this.router.post('/', function (req, res) {
            console.log(req.body.username);
            res.send("POST llego");
        }); **/
    }
}

const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;