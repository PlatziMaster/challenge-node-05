const MongoLib = require('../lib/mongo');

// SE CREA LA CALSE QuotesService CON LOS METODOS PARA REALIZAR LAS PETICIONES HTTP
class QuotesService {
  constructor() {
    // SE ESTABLECE QUE LA collection/tabla SEA quotes
    this.collection = "quotes";
    this.mongoDB = new MongoLib();
  }

  // LISTAR TODAS LAS QUOTE
  async getQuotes() {
    // SE ENVIA EL QUERY null A LA CLASE MongoLib QUE SE IMPORTA DEL ARCHIVO lib/mongo.getAll
    const quotes = await this.mongoDB.getAll(this.collection, null);
    
    // SI LOS PRODUCTOS NO EXISTEN DEVUELVE UN ARREGLO VACIO
    return quotes || []; 
  }
  
  // CREAR NUEVA QUOTE
  async createdQuotes({ quote }) {
    // SE ENVIA EL QUERY A LA CLASE MongoLib QUE SE IMPORTA DEL ARCHIVO lib/mongo.create
    const createdQuotesId = await this.mongoDB.create(this.collection, quote);

    return createdQuotesId;
  }
}

module.exports = QuotesService;
