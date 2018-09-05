const TESTING_HOST = 'http://localhost:3000';

const USER = {
  username: 'pepito',
  password: '123456',
  email: 'pepito@pepe.com'
}

const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/


describe("Cuando se hacen distintas operaciones sobre la API.", () => {

  let Request = require("request");
  let Main
  let token;

  // Antes de todos los describes internos.
  beforeAll(() => {
    // Levanta el servidor.
    Main = require("../../src/core/Main");
    // Borro todos los usuarios de la coleccion.
    require('../../src/users/UsersModel').deleteMany({}, (err) => {
      if (err) {
        throw "No se pudo borrar todos los usuarios de la colleccion.";
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
  describe("Cuando se hace un post sobre /users para registrar un usuario.", () => {

    /**
     * Request invalido.
     */
    describe("Con un request invalido.", () => {

      let data = {};

      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: 'http://localhost:3000/users',
          body: JSON.stringify({
            // "asername"
            "asername": "pepito",
            "password": "123456",
            "email": "pepito@pepe.com"
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });

      it("Verifica que el status devuelto sea 400", () => {
        expect(data.status).toBe(400);
      });

      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe("Error");
        expect(JSON.parse(data.body).message).toBe("Request invalido");
      });

    });

    /**
     *  Alta de usuario ejecutada correctamente.
     */
    describe("Con un usuario correcto.", () => {

      let data = {};

      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: 'http://localhost:3000/users',
          body: JSON.stringify({
            "username": "pepito",
            "password": "123456",
            "email": "pepito@pepe.com"
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });

      it("Verifica que el status devuelto sea 200", () => {
        expect(data.status).toBe(200);
      });

      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe("Ok");
        expect(JSON.parse(data.body).message).toBe("Se ha registrado correctamente");
      });

      /**
       * Verificar persistencia en base.
       */
      describe("Cuando se crea el usuario en base", () => {

        let user

        beforeAll((done) => {
          require('../../src/users/UsersModel').findOne({
            username: "pepito",
            email: "pepito@pepe.com"
          }, (err, res) => {
            if (err) {
              throw "No se persistio el usuario."
            }
            else {
              user = res;
              done();
            }
          });
        });

        it("Verifica que el usuario persistido coincida con el enviado en el request.", () => {
          expect(user.username).toBe("pepito");
          expect(user.email).toBe("pepito@pepe.com");
        });

      });
    });

    /**
     * Usuario duplicado.
     */
    describe("Con un usuario duplicado.", () => {

      let data = {};

      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: 'http://localhost:3000/users',
          body: JSON.stringify({
            "username": "pepito",
            "password": "123456",
            "email": "pepito@pepe.com"
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });

      it("Verifica que el status devuelto sea 400", () => {
        expect(data.status).toBe(400);
      });

      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe("Error");
        expect(JSON.parse(data.body).message).toBe("Usuario duplicado");
      });
    });

  });
  // FIN USERS POST

  /**
   * POST /authenticate. Login.
   */
  describe("Cuando se hace un post sobre /authenticate para loguear un usuario.", () => {

    /**
    * Request invalido.
    */
    describe("Con un request invalido.", () => {

      let data = {};

      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: TESTING_HOST + '/authenticate',
          body: JSON.stringify({
            // asername
            "asername": USER.username,
            "password": USER.password
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });

      it("Verifica que el status devuelto sea 400", () => {
        expect(data.status).toBe(400);
      });

      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe("Error");
        expect(JSON.parse(data.body).message).toBe("Request invalido");
      });
    });

    /**
     *  Usuario que no existente.
     */
    describe("Con un usuario que no existe.", () => {
  
      let data = {};
  
      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: TESTING_HOST + '/authenticate',
          body: JSON.stringify({
            "username": 'el_edu_nandu88',
            "password": USER.password
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });
  
      it("Verifica que el status devuelto sea 401", () => {
        expect(data.status).toBe(401);
      });
  
      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe('Error');
        expect(JSON.parse(data.body).message).toBe('Credenciales invalidas');
      }); 
    });

     /**
     *  Contrasenia incorrecta.
     */
    describe("Con una contrasenia incorrecta.", () => {
  
      let data = {};
  
      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: TESTING_HOST + '/authenticate',
          body: JSON.stringify({
            "username": USER.username,
            "password": 'codornizMasterPass'
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
      });
  
      it("Verifica que el status devuelto sea 401", () => {
        expect(data.status).toBe(401);
      });
  
      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).status).toBe('Error');
        expect(JSON.parse(data.body).message).toBe('Credenciales invalidas');
      }); 
    });

    /**
     *  Login correcto.
     */
    describe("Con credenciales correctas.", () => {
  
      let data = {};
  
      beforeAll((done) => {
        Request.post({
          headers: { 'content-type': 'application/json' },
          url: TESTING_HOST + '/authenticate',
          body: JSON.stringify({
            "username": USER.username,
            "password": USER.password
          }),
        }, (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          token = JSON.parse(data.body).token;
          done();
        });
      });
  
      it("Verifica que el status devuelto sea 200", () => {
        expect(data.status).toBe(200);
      });
  
      it("Verifica que el status en cuerpo del body se correcto.", () => {
        expect(JSON.parse(data.body).token).toMatch(JWT_REGEX);
        expect(JSON.parse(data.body).users).toEqual(jasmine.any(Array))
        expect(JSON.parse(data.body).users.includes(USER.username)).toBe(true);
      }); 
    });

  });

});







