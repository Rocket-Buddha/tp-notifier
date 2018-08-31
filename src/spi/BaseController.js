class BaseController {

    constructor() {

        if (new.target === BaseController) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        let express = require('express');
        let bodyParser = require('body-parser');
        //
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
        //
        this.buildRouter();
        //
        this.model = null;
    }

    buildRouter() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }
}

module.exports = BaseController;
