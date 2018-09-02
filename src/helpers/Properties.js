// Constante que guarda el file path a las properties.
const PROPERTIES_FILE_PATH = './env/app.properties';

const propertiesSingleton = require('properties-reader')(PROPERTIES_FILE_PATH);
module.exports = propertiesSingleton;