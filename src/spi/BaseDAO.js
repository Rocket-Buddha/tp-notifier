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
        this.buildSchema;
        this.buildSchema();
    }
    
    // Metodo a ser implementado por el subtipo para definir el esquema de persistencia para la entidad.
    buildSchema() {
        throw new Error('You have to implement the method build router in your own extended class!');
    }

    // Methodo para persistir por primera vez el objeto.
    create(pObject, pErrorCallback) {
        var flag = this.schema.create(this.getCreateSchema(pObject), pErrorCallback);
    }

    // Metodo a ser implementado por el subtipo para generar el esquema adecuado segun la entidad.
    getCreateSchema(pObject){
        throw new Error('You have to implement the method build router in your own extended class!');
    }
}
//Export de la definicion de la clase abstracta BaseDao definida en el arquetipo.
module.exports = BaseDAO;