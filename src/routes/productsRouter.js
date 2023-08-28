import { Router } from "express";

import { ProductManager } from '../ProductManager.js';

const productRouter = Router();

const productManager = new ProductManager('./src/data/products.json');

productRouter.get('/', (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let products = productManager.getProductList();
        res.send(limit ? products.slice(0, limit) : products);
    } catch (err) {
        res.status(500).send(err);
    }
})

productRouter.get('/:id', (req, res) => {
    try {
        let id = req.params.id;
        let product = productManager.getProductById(id);
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }

})

productRouter.post('/', (req, res) => {
    try {
        let productData = req.body;
        res.send(productManager.addProduct(productData));
    } catch (err) {
        res.status(500).send(err);
    }
})

productRouter.put('/:id', (req, res) => {
    try {
        let id = req.params.id;
        let productData = req.body;
        res.send(productManager.updateProduct(id, productData));
    } catch (err) {
        res.status(500).send(err);
    }
})

productRouter.delete('/:id', (req, res) => {
    try {
        let id = req.params.id;
        res.send(productManager.deleteProduct(id));
    } catch (err) {
        res.status(500).send(err);
    }
})

export default productRouter;