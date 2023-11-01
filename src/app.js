import { PRODUCTS_JSON, PORT } from "./config.js";
import express from "express";
import { ProductManager } from "./ProductManager.js";

const products = new ProductManager(PRODUCTS_JSON);
const app = express();

app.get("/postres", async (req, res) => {
  const limit = req.query.limit;
  const price = req.query.price;
  try {
    const desserts = await products.getAll({ price, limit });
    res.json(desserts);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/postres/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const desserts = await products.getById(id);
    res.json(desserts);
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Conectado al puerto ${PORT}`);
});
