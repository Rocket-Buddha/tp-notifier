
let BaseController = require('../spi/BaseController.js');

class UserController extends BaseController{

    buildRouter() {

        // GET
        this.router.get('/', function (req, res) {
            res.send("GET llego");
        });

        // POST
        this.router.post('/', function (req, res) {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    res.status(200).send(user);
                });
        });
    }
}

const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;