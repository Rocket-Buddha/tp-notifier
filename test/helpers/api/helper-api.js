const ServerManager = require('../../../bin/www/ServerManager');
const UsersModel = require('../../../src/users/UsersModel');
const MessagesModel = require('../../../src/messages/MessagesModel');

// Antes de todos los describes internos.
beforeAll((done) => {
  // Borro todos los usuarios de la coleccion.
  UsersModel.deleteMany({}, (err) => {
    if (err) {
      throw 'No se pudo borrar todos los usuarios de la colleccion.';
    } else {
      // Borro todos los mensajes de la coleccion.
      MessagesModel.deleteMany({}, (err) => {
        if (err) {
          throw 'No se pudo borrar todos los mensajes de la colleccion.';
        } else {
          done();
        }
      });
    }
  });
});

// Despues de todos los describes internos.
afterAll((done) => {
  // Borro todos los usuarios de la coleccion.
  UsersModel.deleteMany({}, (err) => {
    if (err) {
      throw 'No se pudo borrar todos los usuarios de la colleccion.';
    } else {
      // Borro todos los mensajes de la coleccion.
      MessagesModel.deleteMany({}, (err) => {
        if (err) {
          throw 'No se pudo borrar todos los mensajes de la colleccion.';
        } else {
          ServerManager.serverClose();
          done();
        }
      });
    }
  });
});
