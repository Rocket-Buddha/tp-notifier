// Request para poder ejecutar los metodos de los endpoints.
const Request = require('request');
// Constante de host de testing.
const SHARED = require('../helpers/api/shared-api');

/**
 * POST /authenticate. Login.
 */
describe('Cuando se hace un post sobre /authenticate para loguear un usuario.', () => {

  /**
   * Request invalido.
   */
  describe('Con un request invalido.', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: { 'content-type': 'application/json',
        'correlational-id': SHARED.correlationalId, },
        url: `${SHARED.TESTING_HOST}/authenticate`,
        body: JSON.stringify({
          // asername
          asername: SHARED.USER.username,
          password: SHARED.USER.password,
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
   *  Usuario que no existente.
   */
  describe('Con un usuario que no existe.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'correlational-id': SHARED.correlationalId,
        },
        url: `${SHARED.TESTING_HOST}/authenticate`,
        body: JSON.stringify({
          username: 'el_edu_nandu88',
          password: SHARED.USER.password,
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
      expect(JSON.parse(data.body).message).toBe('Credenciales invalidas');
    });
  });

  /**
   *  Contrasenia incorrecta.
   */
  describe('Con una contrasenia incorrecta.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'correlational-id': SHARED.correlationalId,
        },
        url: `${SHARED.TESTING_HOST}/authenticate`,
        body: JSON.stringify({
          username: SHARED.USER.username,
          password: 'codornizMasterPass',
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
      expect(JSON.parse(data.body).message).toBe('Credenciales invalidas');
    });
  });

  /**
   *  Login correcto.
   */
  describe('Con credenciales correctas.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'correlational-id': SHARED.correlationalId,
        },
        url: `${SHARED.TESTING_HOST}/authenticate`,
        body: JSON.stringify({
          username: SHARED.USER.username,
          password: SHARED.USER.password,
        }),
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        SHARED.token = JSON.parse(data.body).token;
        done();
      });
    });

    it('Verifica que el status devuelto sea 200', () => {
      expect(data.status).toBe(200);
    });

    it('Verifica que el status en cuerpo del body se correcto.', () => {
      expect(JSON.parse(data.body).token).toMatch(SHARED.JWT_REGEX);
      expect(JSON.parse(data.body).users).toEqual(jasmine.any(Array));
      expect(JSON.parse(data.body).users.includes(SHARED.USER.username)).toBe(true);
    });
  });
});