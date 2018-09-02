// Clase de entidad mensaje.
class Message {

    // Constructor con todos los atributos.
    constructor(pSender,
        pRecipients,
        pMessage,
        pTimestamp,
        pReaded) {
        this.sender = pSender;
        this.recipients = pRecipients;
        this.message = pMessage;
        this.timestamp = pTimestamp;
        this.readed = pReaded;
    }
}
// Exportacion de definicion de la clase.
module.exports = Message;