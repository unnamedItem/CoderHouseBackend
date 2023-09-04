import crypto from 'crypto';
import fs from 'fs';

import { isNumber, isString, required } from './utils.js';

class ProductManager {
    path;

    constructor(path) {
        this.path = path;
    }

    createProduct(productData) {
        return {
            id: crypto.randomUUID(),
            title: required(productData, 'title', isString, 'must be a string'),
            price: required(productData, 'price', isNumber, 'must be a number'),
            description: required(productData, 'description', isString, 'must be a string'),
            code: required(productData, 'code',isString, 'must be a string'),
            stock: required(productData, 'stock', isNumber, 'must be a number'),
            status: productData.status || true,
            category: required(productData, 'category', isString, 'must be a string'),
            thumbnail: productData.thumbnail || []
        }
    }

    addProduct(productData) {
        let products = JSON.parse(fs.readFileSync(this.path));
        let product = this.createProduct(productData);
        try {
            const isAlreadyAdded = products.some(prod => prod.code === product.code);
            if (!isAlreadyAdded) {
                products.push(product);
                fs.writeFileSync(this.path, JSON.stringify(products));
                return product.id;
            } else {
                throw new Error("Error: [this product already exist]");
            }
        } catch (err) {
            throw err.message;
        }

    }

    getProductList() {
        let products = JSON.parse(fs.readFileSync(this.path));
        return products;
    }

    getProductById(id) {
        try {
            let products = JSON.parse(fs.readFileSync(this.path));
            let product = products.find(prod => prod.id === id);
            if (product) {
                return product;
            } else {
                throw new Error(`Error: [cannot find id "${id}" product]`);
            }
        } catch (err) {
            throw err.message;
        }
    }

    updateProduct(id, payload) {
        try {
            let products = JSON.parse(fs.readFileSync(this.path));
            let product = products.find(prod => prod.id === id);
            if (product) {
                delete payload.id;
                let index = products.indexOf(product);
                products[index] = { ...product, ...payload };
                fs.writeFileSync(this.path, JSON.stringify(products));
                return products[index];
            } else {
                throw new Error(`Error: [cannot find id "${id}" product]`);
            }
        } catch (err) {
            throw err.message;
        }
    }

    deleteProduct(id) {
        try {
            let products = JSON.parse(fs.readFileSync(this.path));
            let product = products.find(prod => prod.id === id);
            if (product) {
                let index = products.indexOf(product);
                products.splice(index, 1);
                fs.writeFileSync(this.path, JSON.stringify(products));
                return product;
            } else {
                throw new Error(`Error: [cannot find id "${id}" product]`);
            }
        } catch (err) {
            throw err.message;
        }
    }
}

export {
    ProductManager
}