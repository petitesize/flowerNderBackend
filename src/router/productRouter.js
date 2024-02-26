const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const productRouter = express.Router();

// GET /api/v1/products
// GET /api/v1/products?category={category}
productRouter.get("/", productController.getProducts);

// GET /api/v1/products/:productId
productRouter.get(
  "/:productId",
  productController.getProduct 
);

module.exports = productRouter;