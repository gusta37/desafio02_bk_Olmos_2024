const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
    this.productIdCounter = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  addProduct(product) {
    product.id = this.productIdCounter++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }
}

module.exports = ProductManager;

//Agregar un producto:
const productManager = new ProductManager('./products.json');
const newProduct = { name: 'Producto nuevo', price: 10 };
productManager.addProduct(newProduct);

//Obtener todos los productos:
const products = productManager.getProducts();
console.log(products);

//Obtener un producto por su ID:
const productId = 1;
const product = productManager.getProductById(productId);
console.log(product);

//Actualizar un producto:
// const productId = 1;
const updatedProduct = { name: 'Producto actualizado', price: 20 };
productManager.updateProduct(productId, updatedProduct);

//Eliminar un producto:
// const productId = 1;
productManager.deleteProduct(productId);