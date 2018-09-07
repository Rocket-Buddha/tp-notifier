// Constante de host de testing.
const TESTING_HOST = 'http://localhost:3000';
//
const USER = {
  username: 'pepito',
  password: '123456',
  email: 'pepito@pepe.com',
};
// Constante de mensaje.
const MESSAGE = {
  message: 'Hola a todos los invito a mi cumple.',
  recipients: [{
    username: 'pepito',
  },
  {
    username: 'Jaime ',
  },
  {
    username: 'Fiorella',
  },
  ],
};
// Constante de expresion regular JWT.
const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
// Constante de expresion regular para UTC ISO.
const UTC_ISO_REGEX = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?.([0-9][0-9][0-9])(Z)?$/;
// Constante de fake token.
const FAKE_TOKEN = 'e1T0kenD3l4Gent3NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0b28iLCJlbWFpbCI6InBlcGl0b0BwZXBlLmNvbSIsImlhdCI6MTUzNTkyOTI0Nn0.EJEJf0QHj9DTnejNCdUKcvMxhZEbVun4KuFMLCWRflQ';

/**
 *
 */
describe('Cuando se hacen distintas operaciones sobre la API.', () => {
  const Request = require('request');
  let Main;
  let token;

  // Antes de todos los describes internos.
  beforeAll(() => {
    // Levanta el servidor.
    Main = require('../../bin/www/ServerManager');
    // Borro todos los usuarios de la coleccion.
    require('../../src/users/UsersModel').deleteMany({}, (err) => {
      if (err) {
        throw 'No se pudo borrar todos los usuarios de la colleccion.';
      }
    });
    // Borro todos los mensajes de la coleccion.
    require('../../src/messages/MessagesModel').deleteMany({}, (err) => {
      if (err) {
        throw 'No se pudo borrar todos los mensajes de la colleccion.';
      }
    });
  });

  // Despues de todos los describes internos.
  afterAll(() => {
    // Baja el servidor.
    Main.serverClose();
  });

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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST }/users`,
          body: JSON.stringify({
            // "asername"
            asername: USER.username,
            password: USER.password,
            email: USER.email,
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
     *  Alta de usuario ejecutada correctamente.
     */
    describe('Con un usuario correcto.', () => {
      const data = {};

      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST}/users`,
          body: JSON.stringify({
            username: USER.username,
            password: USER.password,
            email: USER.email,
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
          require('../../src/users/UsersModel').findOne({
            username: USER.username,
            email: USER.email,
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
          expect(user.username).toBe(USER.username);
          expect(user.email).toBe(USER.email);
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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST}/users`,
          body: JSON.stringify({
            username: USER.username,
            password: USER.password,
            email: USER.email,
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
  // FIN USERS POST

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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST}/authenticate`,
          body: JSON.stringify({
            // asername
            asername: USER.username,
            password: USER.password,
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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST}/authenticate`,
          body: JSON.stringify({
            username: 'el_edu_nandu88',
            password: USER.password,
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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST}/authenticate`,
          body: JSON.stringify({
            username: USER.username,
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
          headers: { 'content-type': 'application/json' },
          url: `${TESTING_HOST }/authenticate`,
          body: JSON.stringify({
            username: USER.username,
            password: USER.password,
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          token = JSON.parse(data.body).token;
          done();
        });
      });

      it('Verifica que el status devuelto sea 200', () => {
        expect(data.status).toBe(200);
      });

      it('Verifica que el status en cuerpo del body se correcto.', () => {
        expect(JSON.parse(data.body).token).toMatch(JWT_REGEX);
        expect(JSON.parse(data.body).users).toEqual(jasmine.any(Array));
        expect(JSON.parse(data.body).users.includes(USER.username)).toBe(true);
      });
    });
  });
  // FIN AUTH POST

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
            'x-access-token': token,
          },
          url: `${TESTING_HOST }/messages`,
          body: JSON.stringify({
            // mensajje
            mensajje: MESSAGE.message,
            password: MESSAGE.recipients,
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
            'x-access-token': FAKE_TOKEN,
          },
          url: `${TESTING_HOST }/messages`,
          body: JSON.stringify({
            mensaje: MESSAGE.message,
            destinatarios: MESSAGE.recipients,
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
            'x-access-token': token,
          },
          url: `${TESTING_HOST }/messages`,
          body: JSON.stringify({
            mensaje: MESSAGE.message,
            destinatarios: MESSAGE.recipients,
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
          require('../../src/messages/MessagesModel').findOne({
            sender: USER.username,
            message: MESSAGE.message,
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
          expect(message.sender).toBe(USER.username);
          expect(message.message).toBe(MESSAGE.message);
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
            'x-access-token': FAKE_TOKEN,
          },
          url: `${TESTING_HOST}/messages`,
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
            'x-access-token': token,
          },
          url: `${TESTING_HOST }/messages`,
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
        expect(JSON.parse(data.body).mensajesRecibidos[0].remitente).toBe(USER.username);
        expect(JSON.parse(data.body).mensajesRecibidos[0].mensaje).toBe(MESSAGE.message);
        expect(JSON.parse(data.body).mensajesRecibidos[0].enviado).toMatch(UTC_ISO_REGEX);
        expect(JSON.parse(data.body).mensajesRecibidos[0].leido).toBe(false);
      });
    });
  });
});
