const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const productRouter = express.Router();

// GET /api/v1/products
productRouter.get("/", productController.getProducts);

// GET /api/v1/products/:productId
productRouter.get(
  "/:productId",
  // productMiddleware.checkProductIdFrom("path"), 
  productController.getProduct 
);

// GET /api/v1/products?category={category}
productRouter.get(
  "/", 
  productMiddleware.checkProductCategoryFrom("query"), 
  productController.getProducts
); 

module.exports = productRouter;