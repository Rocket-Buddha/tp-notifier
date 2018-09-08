// Request para poder ejecutar los metodos de los endpoints.
const Request = require('request');
// Constante de host de testing.
const SHARED = require('../helpers/api/shared-api');
// Modelo de usuarios.
const MessagesModel = require('../../src/messages/MessagesModel');

/**
 * Enviar un mensaje.
 */
describe('Cuando se hace un POST sobre /messages para enviar un mensaje.', () => {
  
  /**
   * Request invalido.
   */
  describe('Con un request invalido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'x-access-token': SHARED.token,
        },
        url: `${SHARED.TESTING_HOST}/messages`,
        body: JSON.stringify({
          // mensajje
          mensajje: SHARED.MESSAGE.message,
          password: SHARED.MESSAGE.recipients,
        }),
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('Verifica que el status devuelto sea 400', () => {
      expect(data.status).toBe(400);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).status).toBe('Error');
      expect(JSON.parse(data.body).message).toBe('Request invalido');
    });
  });

  /**
   * Token invalido.
   */
  describe('Con un token invalido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'x-access-token': SHARED.FAKE_TOKEN,
        },
        url: `${SHARED.TESTING_HOST}/messages`,
        body: JSON.stringify({
          mensaje: SHARED.MESSAGE.message,
          destinatarios: SHARED.MESSAGE.recipients,
        }),
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('Verifica que el status devuelto sea 401', () => {
      expect(data.status).toBe(401);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).status).toBe('Error');
      expect(JSON.parse(data.body).message).toBe('Token Invalido');
    });
  });

  /**
   * Mensaje enviado correctamente.
   */
  describe('Con token y request valido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'x-access-token': SHARED.token,
        },
        url: `${SHARED.TESTING_HOST}/messages`,
        body: JSON.stringify({
          mensaje: SHARED.MESSAGE.message,
          destinatarios: SHARED.MESSAGE.recipients,
        }),
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('Verifica que el status devuelto sea 200', () => {
      expect(data.status).toBe(200);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).mensaje).toBe('Mensaje posteado con exito');
    });

    /**
     * Verificar persistencia en base.
     */
    describe('Cuando se crea el mensaje en base.', () => {
      let message;

      beforeAll((done) => {
        MessagesModel.findOne({
          sender: SHARED.USER.username,
          message: SHARED.MESSAGE.message,
        }, (err, res) => {
          if (err) {
            throw 'No se persistio el mensaje.';
          } else {
            message = res;
            done();
          }
        });
      });

      it('Verifica que el mensaje persistido coincida con el enviado en el request.', () => {
        expect(message.sender).toBe(SHARED.USER.username);
        expect(message.message).toBe(SHARED.MESSAGE.message);
      });
    });
  });
});

describe('Cuando se hace un GET sobre /messages para ver mensajes.', () => {

  /**
   * Token invalido.
   */
  describe('Con un token invalido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/json',
          'x-access-token': SHARED.FAKE_TOKEN,
        },
        url: `${SHARED.TESTING_HOST}/messages`,
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('Verifica que el status devuelto sea 401', () => {
      expect(data.status).toBe(401);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).status).toBe('Error');
      expect(JSON.parse(data.body).message).toBe('Token Invalido');
    });
  });

  /**
   * Token valido.
   */
  describe('Con un token valido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/json',
          'x-access-token': SHARED.token,
        },
        url: `${SHARED.TESTING_HOST}/messages`,
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });

    it('Verifica que el status devuelto sea 200', () => {
      expect(data.status).toBe(200);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).status).toBe('Ok');
      expect(JSON.parse(data.body).totalMensajes).toBe(1);
      expect(JSON.parse(data.body).mensajesRecibidos).toEqual(jasmine.any(Array));
      expect(JSON.parse(data.body).mensajesRecibidos[0].remitente).toBe(SHARED.USER.username);
      expect(JSON.parse(data.body).mensajesRecibidos[0].mensaje).toBe(SHARED.MESSAGE.message);
      expect(JSON.parse(data.body).mensajesRecibidos[0].enviado).toMatch(SHARED.UTC_ISO_REGEX);
      expect(JSON.parse(data.body).mensajesRecibidos[0].leido).toBe(false);
    });
  });
});

