// EL CAMPO _id SI NO ES AGREGADO POR NOSOTROS DE FORMA EXPLÍCITA, MONGODB LO AGREGA POR NOSOTROS COMO UN ObjectId
// SE IMPORTA LA LIBRERIA DEL DRIVER PARA LA CONEXION
const { MongoClient, ObjectId } = require("mongodb");
// ARCHIVO DE CONFIGURACION
const { config } = require("../config");

// SE IMPORTAN LAS VARIABLES DE CONEXION DEL ARCHIVO DE config/index.js
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// CONFIGURACIÓN PARA CONEXION CON MONGODB ATLAS CON LA LIGA Conect your application
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`; // prettier-ignore

console.log(`MONGO_URI -> ${MONGO_URI}`);
// SE CREA LA CLASE MongoLib CON SU METODO connect() PARA CONECTAR
// CADA VES QUE SE HACE UNA PETICION HTTP
class MongoLib {
  constructor() {
    console.log(`MONGO_URI -> ${MONGO_URI}`);
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }

  connect() {
      if (!MongoLib.connection) {
          MongoLib.connection = new Promise((resolve, reject) => {
            this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to mongo 🚀");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  // LISTAR TODOS LOS PRODUCTOS
  getAll(collection) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find() // REGRESA EL RESULTADO
        .toArray(); // SE CONVIERTE A ARRELGO PARA QUE SE PUEDA MANIPULAR
    });
  }

  // CREAR NUEVO PRODUCTO
  create(collection, data) {
    return this.connect()
      .then((db) => {
        // REGRESA EL RESULTADO DEL insertOne
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }
}

module.exports = MongoLib;
