class JWT {

    constructor() {
        this.jwt = require('jsonwebtoken');
        this.properties = require('./Properties');
    }

    sign(pPayload, pCallback) {
        this.jwt.sign(pPayload, this.properties.get('jwt.token.secret'),pCallback);
    }
}

// Singleton del helper de jason web tokens, me aseguro que solo haya una instancia.
const JWTSingleton = new JWT();
module.exports = JWTSingleton;