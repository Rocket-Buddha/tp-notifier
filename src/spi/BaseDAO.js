// Clase abstracta BaseDAO.
class BaseDAO {

    //Constructor de la clase.
    constructor() {
        // Evita que se instancie la clase BaseDao.
        if (new.target === BaseDAO) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        // Declaracion e instanciacion de atributos.
        this.mongoose = require('mongoose');
        // Llamado la funcion que buildea el schema segun la definicion en el subtipo.
        this.buildSchema();
    }

    // Metodo a ser implementado por el subtipo para definir el esquema de persistencia para la entidad.
    buildSchema() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }

    // Metodo para persistir por primera vez el objeto.
    create(pObject, pErrorCallback) {
       this.schema.create(pObject, pErrorCallback);
    }

    // Metodo para encontrar un doc por algun parametro.
    findOne(pQuery, pCallback){
        this.schema.findOne(pQuery, pCallback);
    }

    getAll(pCallback){
        this.schema.find({}, pCallback);
    }
}
//Export de la definicion de la clase abstracta BaseDao definida en el arquetipo.
module.exports = BaseDAO;