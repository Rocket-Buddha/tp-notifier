// Imports.
// Entidad Usuario plana.
let User = require('../users/User.js');

class Crypt {

    constructor() {
        this.properties = require('./Properties');
        this.bcrypt = require('bcrypt');
    }

    // Metodo para convertir un request que viene con un usuario
    // en una instancia de usuario con el pass hasheado.
    // Esto en produccion habria que migrarlo a asincronico!!!!
    getHashedUserFromRequest(pRequest) {
        // El pass no puede quedar en claro.
        // Instancio el usuario pero con el pass hasheado.
        return (new User(pRequest.body.username,
            this.bcrypt.hashSync(pRequest.body.password, this.properties.get('db.crypt.rounds')),
            pRequest.body.email));
    }
    
    // Esto en produccion habria que migrarlo a asincronico!!!!
    comparePasswords(pPlainPassword, pHashedPassword){
       return this.bcrypt.compareSync(pPlainPassword, pHashedPassword)
    }
    
}
// Singleton del helper de hasheo, me aseguro que solo haya una instancia.
const cryptSingleton = new Crypt();
module.exports = cryptSingleton;