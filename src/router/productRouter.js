const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const productRouter = express.Router();

// GET /api/v1/products
productRouter.get("/", productController.getProducts);

// GET /api/v1/products/:product_id
productRouter.get(
  "/:product_id",
  productMiddleware.checkProductIdFrom("query"), 
  productController.getProduct 
);

// GET /api/v1/products?category={category}
productRouter.get(
  "/", 
  productMiddleware.checkProductCategoryFrom("query"), 
  productController.getProducts
); 

module.exports = productRouter;