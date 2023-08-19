import express from 'express';
import dotenv from 'dotenv';
import { ProductManager } from './src/ProductManager.js';

dotenv.config();

const app = express();
const productManager = new ProductManager('./src/products.json');

app.use(express.urlencoded({ extended: true }))

app.get('/products', (req, res) => {
    let limit = Number(req.query.limit);
    let products = productManager.getProductList();
    res.send(limit ? products.slice(0, limit) : products);
})

app.get('/products/:id', (req, res) => {
    let id = req.params.id;
    let product = productManager.getProductById(id);
    res.send(product);
})

app.listen(process.env.PORT, () => console.log(`Server run on port ${process.env.PORT}`))