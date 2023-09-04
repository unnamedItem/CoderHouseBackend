import express from 'express';
import { baseViewOptions } from '../commons.js';
import { ProductManager } from '../ClassProductManager.js';

const router = express.Router();

const productManager = new ProductManager('./src/data/products.json');

router.get('/', (req, res) => {
    res.render('index', baseViewOptions({}));
})

router.get('/products', (req, res) => {
    let products = productManager.getProductList();
    res.render('home', baseViewOptions({
        products: products,
    }));
})

router.get('/realtimeproducts', (req, res) => {
    let products = productManager.getProductList();
    res.render('realTimeProducts', baseViewOptions({
        products: products,
    }));
})

export default router;