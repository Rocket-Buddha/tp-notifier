// Request para poder ejecutar los metodos de los endpoints.
const Request = require('request');
// Constante de host de testing.
const SHARED = require('../helpers/api/shared-api');
// Modelo de usuarios.
const UsersModel = require('../../src/users/UsersModel');

/**
 * POST /users. Registrar usuario.
 */
describe('Cuando se hace un post sobre /users para registrar un usuario.', () => {

  /**
   * Request invalido.
   */
  describe('Con un request invalido.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
        },
        url: `${SHARED.TESTING_HOST}/users`,
        body: JSON.stringify({
          // "asername"
          asername: SHARED.USER.username,
          password: SHARED.USER.password,
          email: SHARED.USER.email,
        }),
      }, (error, response, body) => { 
        SHARED.correlationalId = response.headers['correlationalid'];
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
   *  Alta de usuario ejecutada correctamente.
   */
  describe('Con un usuario correcto.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'correlational-id': SHARED.correlationalId,
        },
        url: `${SHARED.TESTING_HOST}/users`,
        body: JSON.stringify({
          username: SHARED.USER.username,
          password: SHARED.USER.password,
          email: SHARED.USER.email,
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
      expect(JSON.parse(data.body).status).toBe('Ok');
      expect(JSON.parse(data.body).message).toBe('Se ha registrado correctamente');
    });

    /**
     * Verificar persistencia en base.
     */
    describe('Cuando se crea el usuario en base', () => {
      let user;

      beforeAll((done) => {
        UsersModel.findOne({
          username: SHARED.USER.username,
          email: SHARED.USER.email,
        }, (err, res) => {
          if (err) {
            throw 'No se persistio el usuario.';
          } else {
            user = res;
            done();
          }
        });
      });

      it('Verifica que el usuario persistido coincida con el enviado en el request.', () => {
        expect(user.username).toBe(SHARED.USER.username);
        expect(user.email).toBe(SHARED.USER.email);
      });
    });
  });

  /**
   * Usuario duplicado.
   */
  describe('Con un usuario duplicado.', () => {
    const data = {};

    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/json',
          'correlational-id': SHARED.correlationalId,
        },
        url: `${SHARED.TESTING_HOST}/users`,
        body: JSON.stringify({
          username: SHARED.USER.username,
          password: SHARED.USER.password,
          email: SHARED.USER.email,
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
      expect(JSON.parse(data.body).message).toBe('Usuario duplicado');
    });
  });
});


