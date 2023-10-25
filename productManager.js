const { promises: fs } = require("fs");

class ProductManager {
  constructor({ path }) {
    this.path = path;
    this.products = [];
    this.productIdCounter = 1;
  }

  async init() {
    await this.readProducts();
  }

  async readProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.products = data ? JSON.parse(data) : [];
    } catch (error) {
      if (error.code === "ENOENT") {
        this.products = [];
      } else {
        throw error;
      }
    }
  }

  async writeProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }

  async addProduct(productData) {
    try {
      if (
        !productData.title ||
        !productData.description ||
        !productData.price ||
        !productData.thumbnail ||
        !productData.code ||
        productData.stock === undefined
      ) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
      if (this.products.some((product) => product.code === productData.code)) {
        console.error("El código ya existe. Debe ser único.");
        return;
      }
      const product = {
        id: this.productIdCounter++,
        ...productData,
      };
      this.products.push(product);
      await this.appendProduct(product);
      return product;
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }

  async getProducts() {
    await this.readProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.readProducts();
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return console.error("Producto no encontrado");
    }
    return product;
  }

  async deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex === -1) {
        return console.error("Producto no encontrado");
      }
      this.products.splice(productIndex, 1);
      await this.writeProducts();
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }

  async appendProduct(product) {
    try {
      await fs.appendFile(this.path, JSON.stringify(product) + "\n");
    } catch (error) {
      throw new Error("Error appending product: " + error.message);
    }
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
    await manager.addProduct(productData);
  }

  console.log("Todos los productos:");
  console.log(await manager.getProducts());

  console.log("Producto con ID 2:");
  console.log(await manager.getProductById(2));

  console.log("Eliminando producto con ID 1:");
  await manager.deleteProduct(1);
  console.log("Productos después de eliminar:");
  console.log(await manager.getProducts());
}

main();
