import crypto from 'crypto';
import fs from 'fs';

class ProductManager {
    productos;
    path;

    constructor(path) {
        this.path = path;
    }

    createProduct(title, price, description, code) {
        return {
            id: crypto.randomUUID(),
            title: title,
            price: price,
            description: description,
            code: code,
            stock: 0,
            thumbnail: ''
        }
    }

    addProduct(title, price, description, code) {
        let products = JSON.parse(fs.readFileSync(this.path));
        let product = this.createProduct(title, price, description, code);
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
            console.error(err.message);
            return product.id;
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
            console.error(err.message);
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
            console.error(err.message);
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
            console.error(err.message);
        }
    }
}

export {
    ProductManager
}