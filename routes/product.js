const express = require('express');
const ProductService = require('../Services/Product');
const Product = require('../interfaces/product')

function productApi(app) {
    const router = express.Router();
    app.use("/product", router);
    const productService = new ProductService();

    router.get ("/", async function(req, res, next){
        const { body: id } = req;
        //console.log('getluhn', luhn);
        try {
           const product = await productService.getProduct(id.id);
           res.status(200).json({
                product: product,
                message: 'product requested'
           });
        }
        catch (err) {
            next(err);
        }
    });

    router.put("/", async function(req, res, next){
        const { body: nombre, precio, cantidad, peso } = req;
        try {
            const productCreated = await productService.createProduct(nombre, precio, cantidad, peso);
            res.status(200).json({
                data: productCreated,
                message: 'product created succesfully'
                });
            }
            catch (err) {
            next(err);
            }
    });

    router.post("/", async function(req, res, next){
        const { id, nombre, precio, cantidad, peso  } = req.body;
        try {
            const productUpdate = await productService.updateProduct(id, nombre, precio, cantidad, peso);
            res.status(200).json({
                data: productUpdate,
                message: "post product succesfully"
            })
        } catch (err) {
            next(err);
        }
    });

    router.delete ("/", async function(req, res, next){
        const { body: id } = req;
        console.log('product to delete', id);
        try {
           const productDelete = await productService.deleteProduct(id.id);
           res.status(200).json({
               luhn: productDelete,
               message: 'product succesfully deleted'
           });
        }
        catch (err) {
             next(err);
        }
    });


}

module.exports = productApi;