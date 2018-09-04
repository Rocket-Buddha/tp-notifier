let Request = require("request");

describe("Cuando se usan distintos metodos del endpoint /users.", () => {

  let Main

  // Antes de todos los describes internos.
  beforeAll(() => {
    // Levanta el servidor.
    Main = require("../../src/core/Main");
    // Borro todos los usuarios de la coleccion.
    require('../../src/users/UsersModel').deleteMany({}, (err) => {
      if (err) {
        throw "No se pudo todos los usuarios de la colleccion.";
      }
    });
  });

  // Despues de todos los describes internos.
  afterAll(() => {
    // Baja el servidor.
    Main.serverClose();
  });

  describe("Cuando se hace un POST sobre el endpoint /users con un usuario correcto.", () => {

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
    });

    it("Verifica que el mensaje en cuerpo del body se correcto.", () => {
      expect(JSON.parse(data.body).message).toBe("Se ha registrado correctamente");
    });
  });
});