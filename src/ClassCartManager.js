import crypto from 'crypto';
import fs from 'fs';
import { ProductManager } from './ClassProductManager.js';

const productManager = new ProductManager('./src/data/products.json');

class CartManager {
    path;

    constructor(path) {
        this.path = path;
    }

    createCart() {
        let carts = JSON.parse(fs.readFileSync(this.path));
        let cart = { id: crypto.randomUUID(), products: [] }
        try {
            carts.push(cart);
            fs.writeFileSync(this.path, JSON.stringify(carts));
            return cart.id;
        } catch (err) {
            throw err.message;
        }
    }

    getCartsList() {
        let carts = JSON.parse(fs.readFileSync(this.path));
        return carts;
    }

    getCartById(id) {
        try {
            let carts = JSON.parse(fs.readFileSync(this.path));
            let cart = carts.find(cart => cart.id === id);
            if (cart) {
                return cart;
            } else {
                throw new Error(`Error: [cannot find id "${id}" cart]`);
            }
        } catch (err) {
            throw err.message;
        }
    }

    addProduct(cid, pid) {
        try {
            let carts = JSON.parse(fs.readFileSync(this.path));
            let cart = carts.find(cart => cart.id === cid);
            if (cart) {
                let cIndex = carts.indexOf(cart);
                let products = carts[cIndex].products;

                try {
                    productManager.getProductById(pid);
                } catch (err) {
                    throw new Error(err);
                }

                let product = products.find(prod => prod.id === pid);

                if (product) {
                    let pIndex = products.indexOf(product);
                    carts[cIndex].products[pIndex].quantity += 1;
                } else {
                    carts[cIndex].products.push({ id: pid, quantity: 1 });
                }

                fs.writeFileSync(this.path, JSON.stringify(carts));
                return carts[cIndex];
            } else {
                throw new Error(`Error: [cannot find id "${cid}" cart]`);
            }
        } catch (err) {
            throw err.message;
        }
    }

    deleteCart(id) {
        try {
            let carts = JSON.parse(fs.readFileSync(this.path));
            let cart = carts.find(cart => cart.id === id);
            if (cart) {
                let index = carts.indexOf(cart);
                carts.splice(index, 1);
                fs.writeFileSync(this.path, JSON.stringify(carts));
                return cart;
            } else {
                throw new Error(`Error: [cannot find id "${id}" cart]`);
            }
        } catch (err) {
            throw err.message;
        }
    }
}

export {
    CartManager
}