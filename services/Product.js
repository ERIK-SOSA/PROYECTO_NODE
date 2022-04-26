const MongoLib = require('../lib/mongo')

class ProductService {

    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    async createProduct(n) {
        const productCreated = await this.mongoDB.create(this.collection, n);
        return productCreated;
    }

    async getProduct(n) {
        const product = await this.mongoDB.get(this.collection, n);
        console.log('product from service', product);
        return product || {};
    }

    async updateProduct(id, nombre, precio, cantidad, peso) {
        const productUpdated = await this.mongoDB.updateProduct(this.collection, id, nombre, precio, cantidad, peso);
        console.log('product updated: ', productUpdated);
        return productUpdated || {};
    }

    async deleteProduct(id) {
        const productDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('product deleted', productDeleted);
        return productDeleted || {};
    }





}

module.exports = ProductService;