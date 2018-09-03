// Constante que guarda el file path a las properties.
const PROPERTIES_FILE_PATH = './env/app.properties';

// Singleton de properties, me aseguro que solo haya una instancia.
const propertiesSingleton = require('properties-reader')(PROPERTIES_FILE_PATH);
module.exports = propertiesSingleton;