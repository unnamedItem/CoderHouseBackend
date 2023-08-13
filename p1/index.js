function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class ProductManager {
    productos;

    constructor() {
        this.productos = []
    }

    createProduct(title, price, description, code) {
        return {
            id: uuidv4(),
            title: title,
            price: price,
            description: description,
            code: code,
            stock: 0,
        }
    }

    addProduct(title, price, description, code) {
        try {
            let product = this.createProduct(title, price, description, code);
            const isAlreadyAdded = this.productos.some(prod => prod.code === product.code);
            if (!isAlreadyAdded) {
                this.productos.push(product);
                return product.id;
            } else {
                throw "Error: [this product already exist]";
            }
        } catch (err) {
            console.error(err);
        }

    }

    getProductList() {
        return this.productos;
    }

    getProductById(id) {
        try {
            let product = this.productos.find(prod => prod.id === id);
            if (product) {
                return product;
            } else {
                throw `Error: [cannot find id "${id}" product]`
            }
        } catch (err) {
            console.error(err)
        }

    }
}

let manager = new ProductManager();
const prodId0 = manager.addProduct("item1", 100, "This is a description", "1");
const prodId1 = manager.addProduct("item2", 50, "This is a description", "2");
const prodId2 = manager.addProduct("item3", 175, "This is a description", "3");
const prodId3 = manager.addProduct("item3", 175, "This is a description", "2");

manager.getProductList().forEach(prod => {
    console.log(`ID: ${prod.code} - $${prod.price} [${prod.title}] (${prod.stock})`);
})

console.log(manager.getProductById(prodId1));
manager.getProductById(null);