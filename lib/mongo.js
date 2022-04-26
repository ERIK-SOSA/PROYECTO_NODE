const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

    constructor() {
        this.client = new MongoClient(MONGO_URI), { useNewUrlParser: true};
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.client.db(this.dbName));
                });
            });
        }
        return MongoLib.connection;
    } 

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    get(collection, id) {
        return this.connect().then(db => {
            const result = db.collection(collection).findOne({ _id: ObjectId(id)});
            console.log('result', result);
            return result;
        });
    }

    update(collection, id, data) {
        console.log('collection',collection)
        console.log('id', id)
        console.log('data',data)
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id)}, {$set: {"number": data}}, { upsert: true});
        }).then(result => result.upsertedId || id);
    }

    updateProduct(collection, id, nombre, precio, cantidad, peso ) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id)}, {$set: {"nombre": nombre, "precio": precio, "cantidad": cantidad, "peso": peso}}, { upsert: true});
        }).then(result => id);
    }

    delete(collection, id) {
        return this.connect(). then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id);

    }
}

module.exports = MongoLib;