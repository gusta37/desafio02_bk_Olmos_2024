/* Manejo de archivos:

Consigna:
- Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
Aspectos a incluir.

- La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

Debe guardar objetos con el siguiente formato:
- id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
- title (nombre del producto)
- description (descripción del producto)
- price (precio)
- thumbnail (ruta de imagen)
- code (código identificador)
- stock (número de piezas disponibles)

Aspectos a incluir

- Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
- Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
- Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
- Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
- Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
- Formato del entregable

Archivo de javascript con el nombre ProductManager.js.
*/

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
const productManager = new ProductManager('ruta/del/archivo.json');
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