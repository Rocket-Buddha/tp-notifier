class BaseDAO {

    constructor() {
        if (new.target === BaseDAO) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.schema = null;
        this.mongoose = require('mongoose');
        this.buildSchema;
        this.buildSchema();
    }

    buildSchema() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }

    create(pSchema, pErrorCallback) {
        var flag = this.schema.create(pSchema, pErrorCallback);
    }
}

module.exports = BaseDAO;