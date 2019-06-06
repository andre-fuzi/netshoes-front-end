const express = require('express');
const routes = express.Router();


routes.get('/products', (req, res) => {
    const productsList = require('./../public/data/products.json');

    return res.json(productsList.products);
});

routes.get('/product/:sku', (req, res) => {
    const productsList = require('./../public/data/products.json');
    const product = [...productsList.products].find(el => el.sku == req.params.sku);

    return res.send(product)
});

module.exports = routes;