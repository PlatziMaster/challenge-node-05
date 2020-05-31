const { MongoClient, ObjectID } = require('mongodb');
const debug = require("debug")("app:mongo");
const config = require('../config')

const MONGO_URI = config.mondoUri
const DB_NAME = config.dbName

class MongoLib {
    constructor() {
      this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
      this.dbName = DB_NAME;
    }
  
    connect() {
      if (!MongoLib.connection) {
        MongoLib.connection = new Promise((resolve, reject) => {
          this.client.connect(err => {
            if (err) {
              reject(err);
            }
  
            console.log('Connected succesfully to mongo');
            resolve(this.client.db(this.dbName));
          });
        });
      }
  
      return MongoLib.connection;
    }
  
    getAll(collection) {
      return this.connect().then(db => {
        return db
          .collection(collection)
          .find()
          .toArray();
      });
    }
  
    get(collection, id) {
      return this.connect().then(db => {
        return db.collection(collection).findOne({ _id: ObjectID(id) });
      });
    }
  
    create(collection, data) {
      return this.connect()
        .then(db => {
          return db.collection(collection).insertOne(data);
        })
        .then(result => result.insertedId);
    }
  
    update(collection, id, data) {
      return this.connect()
        .then(db => {
          return db
            .collection(collection)
            .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true });
        })
        .then(result => result.upsertedId || id);
    }
  
    delete(collection, id) {
      return this.connect()
        .then(db => {
          return db.collection(collection).deleteOne({ _id: ObjectID(id) });
        })
        .then(() => id);
    }
  }
  
  module.exports = MongoLib;
  
