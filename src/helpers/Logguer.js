const Winston = require('winston');
const Properties = require('./Properties');
const Time = require('./Time');

class Logguer {
  /**
   * Constructor del Logguer.
   */
  constructor() {
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

  logRequestInfo(pEndPoint, pMethod, pRequest) {
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
      cId: pRequest.headers.cId,
      endpoint: pEndPoint,
      method: pMethod,
      request: {
        headers: myHeaders,
        query: pRequest.query,
        body: myBody,
      },
    };
    this.logger.info(log);
  }

  logEndpointError(pEndPoint, pMethod, pCId, pPayload) {
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

const LogguerSingleton = new Logguer();
module.exports = LogguerSingleton;
