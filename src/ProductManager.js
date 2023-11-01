import fs from "fs/promises";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll(query = {}) {
    try {
      const products = await this.readProducts();
      const { price, limit } = query;

      if (price) {
        const filteredProducts = products.filter(
          (product) => product.price < 10
        );

        if (filteredProducts.length === 0) {
          throw new Error("No se encontraron productos en ese precio.");
        }

        return filteredProducts;
      }

      if (limit) {
        if (isNaN(limit)) {
          throw new Error("Límite inválido.");
        }

        return products.slice(0, limit);
      }

      return products;
    } catch (error) {
      throw new Error("Error al obtener productos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const products = await this.readProducts();
      const product = products.find((p) => p.id === id);

      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }

      return product;
    } catch (error) {
      throw new Error("Error al obtener producto por ID: " + error.message);
    }
  }

  async readProducts() {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      return JSON.parse(productsData);
    } catch (error) {
      if (error.code === "ENOENT") {
        return []; // Retorna un array vacío si el archivo no existe
      } else {
        throw error;
      }
    }
  }
}
