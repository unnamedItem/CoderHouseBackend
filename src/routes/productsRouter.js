import { Router } from "express";

import { ProductManager } from '../ClassProductManager.js';

function setProductRouter(socket) {
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
            socket.emit("product_added", productManager.getProductList());
        } catch (err) {
            res.status(500).send(err);
        }
    })

    productRouter.put('/:id', (req, res) => {
        try {
            let id = req.params.id;
            let productData = req.body;
            res.send(productManager.updateProduct(id, productData));
            socket.emit("product_added", productManager.getProductList());
        } catch (err) {
            res.status(500).send(err);
        }
    })

    productRouter.delete('/:id', (req, res) => {
        try {
            let id = req.params.id;
            res.send(productManager.deleteProduct(id));
            socket.emit("product_added", productManager.getProductList());
        } catch (err) {
            res.status(500).send(err);
        }
    })

    return productRouter;
}

export default setProductRouter;