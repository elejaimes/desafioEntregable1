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

const productsToAdd = [
  {
    title: "Pastel de fresa",
    description: "Delicioso pastel de fresa",
    price: 19.99,
    thumbnail: "imagen.jpg",
    code: "STRAW456",
    stock: 15,
  },
  {
    title: "Galletas de chocolate",
    description: "Crunchy cookies",
    price: 9.99,
    thumbnail: "cookie.jpg",
    code: "CHOCO123",
    stock: 30,
  },
  {
    title: "Cheesecake",
    description: "Delicioso pastel de queso",
    price: 24.99,
    thumbnail: "cheesecake.jpg",
    code: "CHEESE789",
    stock: 10,
  },
  {
    title: "Red Velvet Cake",
    description: "Red velvet cake with cream cheese frosting",
    price: 29.99,
    thumbnail: "redvelvet.jpg",
    code: "VELVET321",
    stock: 12,
  },
  {
    title: "Brownie",
    description: "Rich chocolate brownie with nuts",
    price: 12.99,
    thumbnail: "brownie.jpg",
    code: "BROWN456",
    stock: 20,
  },
];

const manager = new ProductManager();

for (const productData of productsToAdd) {
  manager.addProduct(
    productData.title,
    productData.description,
    productData.price,
    productData.thumbnail,
    productData.code,
    productData.stock
  );
}

console.log("Todos los productos:");
console.log(manager.getProducts());
