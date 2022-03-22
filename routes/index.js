const luhnApi = require('./luhn.js')

function controllers(app) {
    luhnApi(app);
}

module.exports = controllers;
