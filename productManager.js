class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      console.error("Todos los campos son obligatorios.");
      return;
    }
    if (this.products.some((product) => product.code === code)) {
      console.error("El código ya existe. Debe ser único.");
      return;
    }
    const product = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado");
    }
    return product;
  }
}

const manager = new ProductManager();

manager.addProduct(
  "Pastel de fresa",
  "Delicioso pastel de fresa",
  19.99,
  "imagen.jpg",
  "STRAW456",
  15
);

manager.addProduct(
  "Galletas de chocolate",
  "Crunchy cookies",
  9.99,
  "cookie.jpg",
  "CHOCO123",
  30
);

manager.addProduct(
  "Cheesecake",
  "Delicioso pastel de queso",
  24.99,
  "cheesecake.jpg",
  "CHEESE789",
  10
);

manager.addProduct(
  "Red Velvet Cake",
  "Red velvet cake with cream cheese frosting",
  29.99,
  "redvelvet.jpg",
  "VELVET321",
  12
);

manager.addProduct(
  "Brownie",
  "Rich chocolate brownie with nuts",
  12.99,
  "brownie.jpg",
  "BROWN456",
  20
);

console.log("Todos los productos:");
console.log(manager.getProducts());
