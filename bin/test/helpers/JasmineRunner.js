const Jasmine = require('jasmine');
const JasmineConsoleReporter = require('jasmine-console-reporter');

class JasmineRunner {
  constructor(pConfigFilePath, pSpecsFilePaths) {
    this.jasmine = new Jasmine();
    this.jasmine.loadConfigFile(pConfigFilePath);
    this.jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    this.jasmine.env.clearReporters();
    this.jasmine.addReporter(new JasmineConsoleReporter({
      colors: 1, // (0|false)|(1|true)|2
      cleanStack: 1, // (0|false)|(1|true)|2|3
      verbosity: 4, // (0|false)|1|2|(3|true)|4|Object
      listStyle: 'indent', // "flat"|"indent"
      timeUnit: 'ms', // "ms"|"ns"|"s"
      timeThreshold: {
        ok: 500,
        warn: 1000,
        ouch: 3000,
      }, // Object|Number
      activity: true,
      emoji: true, // boolean or emoji-map object
      beep: true,
    }));
    this.specs = pSpecsFilePaths;
  }

  execute(path) {
    try{
      this.jasmine.execute(this.specs);
    } catch (err) {
      console.log(err);
    } 
  }
}

module.exports = JasmineRunner;
