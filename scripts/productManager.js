//exportamos una clase productManager que se encargue de gestionar los productos
import { LocalStorage } from './localStorage.js'
// Clase ProductManager que hereda de LocalStorage
export class ProductManager extends LocalStorage {
    #productsKey = 'products';
    #products;
 
    constructor() {
        super();
        // Obtener la lista de productos del localStorage al inicializar
        this.#products = LocalStorage.getData(this.#productsKey);
    }
 
    // Método para obtener la lista de productos
    listProducts() {
        return this.#products;
    }
 
    
    // Método para agregar un producto
    addProduct(product) {
        const existingProduct = this.#products.find(p => p.id === product.id);
        if (existingProduct) {
            console.log('El producto con el mismo ID ya existe.');
            return;
        }
        this.#products.push(product);
        // Guardar la lista actualizada en el localStorage
        this.saveProducts();
    }
    // Método para buscar un producto en la tabla
    searchProductInTable(productName) {
        const tableRows = document.querySelectorAll('table tbody tr');
        for (const row of tableRows) {
            const nameCell = row.querySelector('.product-name');
            if (nameCell.textContent.toLowerCase().includes(productName.toLowerCase())) {
                row.classList.add('highlighted');
            } else {
                row.classList.remove('highlighted');
            }
        }
    }
    // Método para actualizar un producto por su ID
    updateProductById(id, updatedProduct) {
        const index = this.#products.findIndex(product => product.id === id);
 
        if (index !== -1) {
            this.#products[index] = updatedProduct;
            // Guardar la lista actualizada en el localStorage
            this.saveProducts();
        }
    }
 
    // Método para eliminar un producto por su ID
    deleteProductById(id) {
        const index = this.#products.findIndex(product => product.id === id);
 
        if (index !== -1) {
            this.#products.splice(index, 1);
            // Guardar la lista actualizada en el localStorage
            this.saveProducts();
        }
    }
 
    // Método para guardar la lista de productos en el localStorage
    saveProducts() {
        LocalStorage.setData(this.#productsKey, this.#products);
    }
}