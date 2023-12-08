/**
 * @Author : Jorge Ordiz Pérez
 * @github : 
 */
import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
const getRandomQuantity = () =>{
  return Math.floor(Math.random()*50)+1;

}

let list;
localStorage.removeItem("productData");
list = [];
const productManager = new ProductManager();
// Verificar si hay datos en el localStorage


if (!localStorage.getItem("productData")) {
  list = [
    new Product(1, "The Witcher 3: Wild Hunt", getRandomQuantity(), 69.99),
    new Product(2, "The Legend of Zelda: Breath of the Wild", getRandomQuantity(), 50.99),
    new Product(3, "Mass Effect: Legendary Edition", getRandomQuantity(), 69.99),
    new Product(4, "Call of Duty: Modern Warfare", getRandomQuantity(), 69.99),
    new Product(5, "Red Dead Redemption 2", getRandomQuantity(), 69.99),
    new Product(6, "Uncharted 4: A Thief's End", getRandomQuantity(), 50.99),
    new Product(7, "The Sims 4", getRandomQuantity(), 69.99),
    new Product(8, "The Elder Scrolls V: Skyrim", getRandomQuantity(), 50.99),
    new Product(9, "Resident Evil 2 Remake", getRandomQuantity(), 50.99),
    new Product(10, "Subnautica", getRandomQuantity(), 50.99),
    new Product(11, "Cyberpunk 2077", getRandomQuantity(), 9.55),
    new Product(12, "Hulk", getRandomQuantity(), 69.99),
    new Product(13, "FIFA 22", getRandomQuantity(), 69.99),
    new Product(14, "Final Fantasy VII Remake", getRandomQuantity(), 50.99),
  ];
  list.forEach((product) => productManager.addProduct(product)); // añadimos los productos al productManager
  updateInventoryTable(); // actualizamos la tabla de productos

} else {
  // Obtener los datos del localStorage y agregarlos al productManager
  const storedData = JSON.parse(localStorage.getItem("productData"));
  storedData.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.nombre,
      productData.cantidad,
      productData.precio
    );
    productManager.addProduct(product);
  });
  updateInventoryTable(); // actualizamos la tabla de productos
}

// Agregar un evento de envío al formulario
document
  .getElementById("product-form-events")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productQuantity = parseInt(
      document.getElementById("product-quantity").value
    );
    const productPrice = parseFloat(
      document.getElementById("product-price").value
    );

    if (!productName || isNaN(productQuantity) || isNaN(productPrice)) {
      alert("Porfavor introduce los datos adecuados.");
      return;
    }

    const newProduct = new Product( // creamos un nuevo producto
      Date.now(), // usamos la fecha actual como ID
      productName,
      productQuantity,
      productPrice
    );

    productManager.addProduct(newProduct);
    this.reset();
    updateInventoryTable();
  });

function updateInventoryTable() {
  // actualizamos la tabla de productos
  const tableBody = document.getElementById("body-table");
  tableBody.innerHTML = "";

  const products = productManager.listProducts();

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.nombre}</td>
      <td>${product.cantidad}</td>
      <td>${product.precio}</td>
      <td>
        <button class="edit-button" data-id="${product.id}">Editar</button>
        <button class="delete-button" data-id="${product.id}">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

document
  .getElementById("body-table")
  .addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("edit-button")) {
      const productId = parseInt(target.dataset.id);
      const editedProduct = prompt(
        "Introduce los datos correctos en este orden (NOMBRE, CANTIDAD, PRECIO):"
      );
      if (editedProduct) {
        const [name, quantity, price] = editedProduct
          .split(",")
          .map((value) => value.trim());
        const updatedProduct = new Product(
          productId,
          name,
          parseInt(quantity),
          parseFloat(price)
        );
        productManager.updateProductById(productId, updatedProduct);
        updateInventoryTable();
      }
    } else if (target.classList.contains("delete-button")) {
      const productId = parseInt(target.dataset.id);
      productManager.deleteProductById(productId);
      updateInventoryTable();
    }
  });

// Obten el botón de búsqueda y agrega un evento de clic
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
  // Obten el valor del campo de búsqueda
  const searchTerm = document
    .getElementById("search-product")
    .value.toLowerCase();

  // Obtén todas las filas de la tabla
  const tableRows = document.querySelectorAll(
    "#inventory-table-events tbody tr"
  );

  // Filtra las filas para encontrar las que coinciden con el término de búsqueda
  const matchingRows = Array.from(tableRows).filter((row) => {
    // Obtén el texto de la celda que contiene el nombre del producto (ajusta esto según la estructura real de tu tabla)
    const productName = row
      .querySelector("td:nth-child(1)")
      .textContent.toLowerCase();
    // Verifica si el término de búsqueda está presente en el nombre del producto
    return productName.includes(searchTerm);
  });

  // Oculta todas las filas
  tableRows.forEach((row) => {
    row.style.display = "none";
  });

  // Muestra solo las filas que coinciden con la búsqueda
  matchingRows.forEach((row) => {
    row.style.display = "";
  });
});

const searchInput = document.getElementById("search-product");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Obten el valor del campo de búsqueda
    const searchTerm = searchInput.value.toLowerCase();

    // Obtén todas las filas de la tabla
    const tableRows = document.querySelectorAll(
      "#inventory-table-events tbody tr"
    );

    // Filtra las filas para encontrar las que coinciden con el término de búsqueda
    const matchingRows = Array.from(tableRows).filter((row) => {
      // Obtén el texto de la celda que contiene el nombre del producto (ajusta esto según la estructura real de tu tabla)
      const productName = row
        .querySelector("td:nth-child(1)")
        .textContent.toLowerCase();
      // Verifica si el término de búsqueda está presente en el nombre del producto
      return productName.includes(searchTerm);
    });

    // Si el campo de búsqueda está vacío, muestra todas las filas de la tabla
    if (searchTerm === "") {
      tableRows.forEach((row) => {
        row.style.display = "";
      });
    } else {
      // Oculta todas las filas
      tableRows.forEach((row) => {
        row.style.display = "none";
      });

      // Muestra solo las filas que coinciden con la búsqueda
      matchingRows.forEach((row) => {
        row.style.display = "";
      });
    }
  }
});
//funcion subir al principio de la pagina
const subir = document.getElementById("elevator");
subir.addEventListener("click", function () {
  document.body.scrollTop = 0; // Para navegadores antiguos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
});

const precioTotal = () => {
  const products = productManager.listProducts();
  let precioTotal = 0;
  products.forEach((producto) => {
    precioTotal += parseInt(producto.cantidad)  * parseFloat(producto.precio);
  });
  totalValue.innerText = precioTotal.toLocaleString() + "€";

  return precioTotal;
};

const totalValue = () => {
  const totalValue = document.getElementById("totalValue");
  totalValue.innerHTML = precioTotal() + " €";
};

totalValue();