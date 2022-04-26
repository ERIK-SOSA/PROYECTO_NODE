const MongoLib = require('../lib/mongo')

class LuhnService {

    constructor() {
        this.collection = 'appweb';
        this.mongoDB = new MongoLib();
    }

    async createLuhn(n) {
        const luhnCreated = await this.mongoDB.create(this.collection, n);
        return luhnCreated;
    }

    async getLuhn(n) {
        const luhn = await this.mongoDB.get(this.collection, n);
        console.log('luhn from service', luhn);
        return luhn || {};
    }

    async updateLuhn(data) {
        const luhnUpdated = await this.mongoDB.update(this.collection, data.id, data.data);
        console.log('luhn updated', luhnUpdated);
        return luhnUpdated || {};
    }

    async deleteLuhn(id) {
        const luhnDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('luhn deleted', luhnDeleted);
        return luhnDeleted || {};
    }

}

module.exports = LuhnService;