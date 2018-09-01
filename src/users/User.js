// Clase de entidad Usuario.
class User  {

    // Constructor con todos los atributos.
    constructor(pUsername,
        pPassword,
        pEmail) {
            this.username = pUsername;
            this.password = pPassword;
            this.email = pEmail;
    }
}
// Exportacion de definicion de la clase.
module.exports = User;