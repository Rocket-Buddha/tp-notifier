/**
 * Clase de entidad mensaje.
 */
class Message {

    /**
     * Constructor con todos los atributos.
     * @param {String} pSender - Username de quien envio el mensaje. 
     * @param {Array} pRecipients - Usernames de quienes recibiran el mensaje.
     * @param {String} pMessage - Mensaje.
     * @param {String} pTimestamp - Timestamp en ISO UTC.
     * @param {Boolean} pReaded - Flag de leiodo o no leido.
     */
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