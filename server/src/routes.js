const express = require('express');
const routes = express.Router();

routes.get('/products', (req, res) => {
    const productsList = require('./../public/data/products.json');

    return res.json(productsList.products);
});

module.exports = routes;