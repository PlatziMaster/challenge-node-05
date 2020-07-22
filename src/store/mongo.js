const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;

//const MONGO_URI = `mongodb://${USER}:${PASSWORD}@curso-platzi-shard-00-00.d0svn.mongodb.net:27017,curso-platzi-shard-00-01.d0svn.mongodb.net:27017,curso-platzi-shard-00-02.d0svn.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-11jkj6-shard-0&authSource=admin&retryWrites=true&w=majority`;
const MONGO_URI = `mongodb://localhost:27017/RED`
class MongoLib {
    
    constructor(){
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser:true});
        this.db_name = DB_NAME;
    }

    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject)=>{
                this.client.connect( err => {
                    if(err){
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.db_name));
                })
            })
        }
        return MongoLib.connection;
    }
    
    getAll(collection) {
        return this.connect().then(db => {
          return db
            .collection(collection)
            .find({})
            .toArray();
        });
      }
    
    get(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).findOne({ '_id': ObjectId(id)});
        });
    }
    
    create(collection, data){
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }
    
    update(collection, id, data){
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ '_id': ObjectId(id)}, { $set: data}, { upsert: true});
        }).then(result => result.upsertedId || id);
    }
    
    delete(collection, id){
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({'_id': ObjectId(id)});
        }).then(()=> id);
    }
}



module.exports = MongoLib;