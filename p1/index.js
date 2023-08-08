class Product {
    title;
    description;
    price;
    thumbnail;
    code;
    stock;

    constructor(title, price, description, code) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.code = code;
        this.stock = 0;
    }
}

class ProductManager {
    productos;

    constructor() {
        this.productos = []
    }

    addProduct(product) {
        const isAlreadyAdded = this.productos.some(prod => prod.code === product.code);
        if (!isAlreadyAdded) {
            this.productos.push(product);
            return true;
        } else {
            return false;
        }
    }

    getProductList() {
        return this.productos;
    }

    getProductById(code) {
        return this.productos.find(prod => prod.code === code);
    }
}

let manager = new ProductManager();
manager.addProduct(new Product("item1", 100, "This is a description", "1"));
manager.addProduct(new Product("item2", 50, "This is a description", "2"));
manager.addProduct(new Product("item3", 175, "This is a description", "3"));
manager.addProduct(new Product("item3", 175, "This is a description", "2"));

manager.getProductList().forEach(prod => {
    console.log(`ID: ${prod.code} - $${prod.price} [${prod.title}] (${prod.stock})`);
})

console.log(manager.getProductById("2"));