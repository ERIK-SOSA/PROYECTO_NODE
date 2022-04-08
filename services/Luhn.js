const MongoLib = require('../lib/mongo')

class LuhnService {

    constructor() {
        this.collection = 'appweb';
        this.mongoDB = new MongoLib();
    }

    async createLuhn(n){
        const luhnCreated = await this.mongoDB.createLuhn(this.collection, n);
        return luhnCreated;
    }

    async getLuhn(n){
        const luhn = await this.mongoDB.getLuhn(this.collection, n);
        console.log('luhn from service', luhn)
        return luhn || {};
    }
}

module.exports = LuhnService;