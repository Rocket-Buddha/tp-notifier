const JasminRunner = require('../helpers/JasmineRunner');

runner = new JasminRunner('test/support/jasmine-api.json',
  ['./test/api-tests/UsersSpec.js',
    './test/api-tests/AuthenticateSpec.js',
    './test/api-tests/MessagesSpec.js']);

runner.execute();