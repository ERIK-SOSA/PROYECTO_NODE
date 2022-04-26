const luhnApi = require('./luhn.js')
const productApi = require('./product.js')

function controllers(app) {
    luhnApi(app);
    productApi(app);
}

module.exports = controllers;
