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
        this.productos.push(product)
    }

    getProductList() {
        return this.productos;
    }
}

let manager = new ProductManager();
manager.addProduct(new Product("item1", 100, "This is a description", "1"));
manager.addProduct(new Product("item2", 50, "This is a description", "2"));
manager.addProduct(new Product("item3", 175, "This is a description", "3"));

manager.getProductList().forEach(prod => {
    console.log(`ID: ${prod.code} - $${prod.price} [${prod.title}] (${prod.stock})`)
})