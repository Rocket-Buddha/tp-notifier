class JWT {

    constructor() {
        this.jwt = require('jsonwebtoken');
        this.properties = require('./Properties');
    }

    sign(pPayload, pCallback) {
        this.jwt.sign(pPayload,
            this.properties.get('jwt.token.secret'),
            { expiresIn: 60 * this.properties.get('jwt.token.expire') },
            pCallback);
    }

    verify(pToken, pCallback) {
        this.jwt.verify(pToken,
            this.properties.get('jwt.token.secret'),
            pCallback);
    }
}

// Singleton del helper de json web tokens, me aseguro que solo haya una instancia.
const JWTSingleton = new JWT();
module.exports = JWTSingleton;