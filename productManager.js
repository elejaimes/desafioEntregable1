const { promises: fs } = require("fs");

class ProductManager {
  constructor({ path }) {
    this.path = path;
    this.products = [];
    this.productIdCounter = 1;
  }

  async init() {
    await this.writeProducts();
  }

  async readProducts() {
    const jsonProducts = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(jsonProducts);
  }

  async writeProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products));
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
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
    await this.readProducts();
    this.products.push(product);
    await this.writeProducts();
  }

  async getProducts() {
    await this.readProducts();
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return console.error("Producto no encontrado");
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

async function main() {
  const manager = new ProductManager({ path: "products.json" });

  await manager.init();

  for (const productData of productsToAdd) {
    await manager.addProduct(
      productData.title,
      productData.description,
      productData.price,
      productData.thumbnail,
      productData.code,
      productData.stock
    );
  }

  console.log("Todos los productos:");
  console.log(await manager.getProducts());
}

main();
