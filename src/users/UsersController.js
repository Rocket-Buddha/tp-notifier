
let BaseController = require('../spi/BaseController.js');

class UserController extends BaseController {

    buildRouter() {
        // POST
        this.router.post('/', function (req, res) {
            require('./UsersDAO').create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            },
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    res.status(200).json({
                        "status": "Ok",
                        "message": "Se ha registrado correctamente"
                    });
                });
        });
    }
}

const userControllerSingleton = new UserController();
module.exports = userControllerSingleton;