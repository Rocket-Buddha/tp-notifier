// Constante de host de testing.
exports.TESTING_HOST = 'http://localhost:3000';
// Usuario con el que se hacen todos los test de API.
exports.USER = {
  username: 'pepito',
  password: '123456',
  email: 'pepito@pepe.com',
};
// Constante de mensaje.
exports.MESSAGE = {
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
exports.JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
// Constante de expresion regular para UTC ISO.
exports.UTC_ISO_REGEX = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?.([0-9][0-9][0-9])(Z)?$/;
// Constante de fake token.
exports.FAKE_TOKEN = 'e1T0kenD3l4Gent3NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0b28iLCJlbWFpbCI6InBlcGl0b0BwZXBlLmNvbSIsImlhdCI6MTUzNTkyOTI0Nn0.EJEJf0QHj9DTnejNCdUKcvMxhZEbVun4KuFMLCWRflQ';
exports.token = 'e1T0kenD3l4Gent3NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGl0b28iLCJlbWFpbCI6InBlcGl0b0BwZXBlLmNvbSIsImlhdCI6MTUzNTkyOTI0Nn0.EJEJf0QHj9DTnejNCdUKcvMxhZEbVun4KuFMLCWRflQ';; 