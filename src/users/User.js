// Clase de entidad Usuario.
class User  {

    // Constructor con todos los atributos.
    constructor(pId,
        pUsername,
        pPassword,
        pEmail) {
            this.id = pId;
            this.username = pUsername;
            this.password = pPassword;
            this.email = pEmail;
    }
}
// Exportacion de definicion de la clase.
module.exports = User;