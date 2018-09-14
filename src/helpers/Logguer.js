const Winston = require('winston');
const Properties = require('./Properties');
const Time = require('./Time');

class Logguer {
  /**
   * Constructor del Logguer.
   */
  constructor() {
    // Configuracion del logguer winston.
    this.logger = Winston.createLogger({
      format: Winston.format.json(),
      transports: [
        new Winston.transports.File({
          filename: `${Properties.get('logging.path')}info.log`,
          level: 'info',
        }),
        new Winston.transports.File({
          filename: `${Properties.get('logging.path')}error.log`,
          level: 'error',
        }),
      ],
    });
  }

  /**
   * Metodo para logguear un request que llega a un endpoint.
   * @param {String} pEndPoint - String del endpoint al que llego el error.
   * @param {String} pMethod - String del metodo que fue ejecutado en el endpoint.
   * @param {Request} pRequest - Request que llego al endpoint.
   */
  logRequestInfo(pCId, pEndPoint, pMethod, pRequest) {
    const myHeaders = JSON.parse(JSON.stringify(pRequest.headers));
    const myBody = JSON.parse(JSON.stringify(pRequest.body));

    if (myHeaders['x-access-token']) {
      myHeaders['x-access-token'] = 'CENSORED';
    }
    if (myBody.password) {
      myBody.password = 'CENSORED';
    }

    const log = {
      timestamp: Time.getTimeString(),
      cId: pCId,
      endpoint: pEndPoint,
      method: pMethod,
      request: {
        headers: myHeaders,
        body: myBody,
      },
    };
    this.logger.info(log);
  }

  logResponseInfo(pCId, pEndPoint, pMethod, pResponse) {
    const myResponse = JSON.parse(JSON.stringify(pResponse));

    const log = {
      timestamp: Time.getTimeString(),
      cId: pCId,
      endpoint: pEndPoint,
      method: pMethod,
      response: myResponse,
    };

    this.logger.info(log);
  }

  /**
   * Metodo para logguear un error en un endpoint.
   * @param {String} pEndPoint - String del endpoint al que llego el error.
   * @param {String} pMethod - String del metodo que fue ejecutado en el endpoint.
   * @param {String} pCId - String del id de coorrelacion de logs.
   * @param {Object} pPayload - Objeto de error que tiene la carga util del problema que sucedio.
   */
  logEndpointError(pCId, pEndPoint, pMethod, pPayload) {
    const log = {
      timestamp: Time.getTimeString(),
      cId: pCId,
      endpoint: pEndPoint,
      method: pMethod,
      payload: pPayload,
    };
    this.logger.error(log);
  }
}

// Singleton del logguer, me aseguro que haya una sola instancia.
const LogguerSingleton = new Logguer();
module.exports = LogguerSingleton;
