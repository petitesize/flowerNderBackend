const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const productRouter = express.Router();

// GET /api/v1/products/:product_id
productRouter.get(
  "/:product_id",
  productMiddleware.checkProductIdFrom("params"), 
  productController.getProduct 
);

// GET /api/v1/products/:category
productRouter.get(
  "/:category", 
  productMiddleware.checkProductCategoryFrom("params"), 
  productController.getProducts
); 

module.exports = productRouter;